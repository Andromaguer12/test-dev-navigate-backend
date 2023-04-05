import UserDocumentModel from '../../../models/users/user';
import { UserDocument, UserDocumentWithoutPassword } from '../../typesDefs/users/types';
import currentErrorInterface from '../errors';
import { validateParcialUser, validateUser } from './validators';
import bcrypt from 'bcrypt';

const handleErrors = (flag: string) => currentErrorInterface({ flag });


const preSaveNewUser = async (body: UserDocument): Promise<UserDocument> => {
  const newBody = { ...body };
  if (newBody.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newBody.password, salt);
    newBody.password = hash;
  }
  return newBody;
};

export const getUser = async (email: string): Promise<UserDocument | undefined> => {
  try {
    const user = await UserDocumentModel.findOne({ email });
    if (user) {
      return user;
    }
  } catch (error) {
    throw new Error(handleErrors(email).USER_NOT_EXISTS);
  }
  return;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerNewUser = async (body: any): Promise<UserDocumentWithoutPassword> => {
  try {
    await validateParcialUser(body);
    const alreadyExists = await getUser(body?.email);
    if (alreadyExists) {
      throw new Error(handleErrors(body.email).USER_ALREADY_EXISTS);
    }
    const newUser = await preSaveNewUser(body);
    const model = new UserDocumentModel(newUser);
    model.save();
    delete newUser.password;
    return newUser;
  } catch (error) {
    throw new Error(handleErrors('INVALID-USER-REGISTRATION-DATA-' + error).INVALID_DATA);
  }
};

export const loginUser = async (email: string, password: string): Promise<UserDocumentWithoutPassword | undefined> => {
  try {
    const thisUser = await getUser(email);
    if (thisUser) {
      const comparation = await bcrypt.compare(password, thisUser?.password as string);
      thisUser.password = undefined;
      if (comparation) return thisUser;
      else {
        throw new Error(handleErrors(email).INCORRECT_PASSWORD);
      }
    }
    else {
      throw new Error(handleErrors(email).USER_NOT_EXISTS);
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateUserResolver  = async (body: any): Promise<UserDocumentWithoutPassword | undefined> => {
  try {
    await validateParcialUser(body);
    const exists = await getUser(body.email);
    if (exists) {
      await UserDocumentModel.updateOne(body);
      const queryUpdatedUser = await getUser(body.email);
      if (queryUpdatedUser) {
        queryUpdatedUser.password = undefined;
        return queryUpdatedUser;
      }
    }
  } catch (error) {
    throw new Error(error as string);
  }
  return;
};

export const deleteUser = async (email: string): Promise<void> => {
  try {
    const exists = await getUser(email);
    if (exists) await UserDocumentModel.deleteOne({ email });
  } catch (error) {
    throw new Error(handleErrors(email).USER_NOT_EXISTS);
  }
  return;
};
