/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { CustomRoutesProps } from '../../../typesDefs/routes/types';
import currentErrorInterface from '../errors';
import { deleteUser, loginUser, registerNewUser, updateUserResolver } from '../resolvers/users.service';
import jwt from 'jsonwebtoken';
import configs from '../../../constants/config/constants';

const handleErrors = (flag: string) => currentErrorInterface({ flag });

export const RegisterUserController = async (req: Request, res: Response, customParams: CustomRoutesProps) => {
  const { body } = req;
  try {
    if (!body.payload.email || !body.payload.password) {
      throw new Error(handleErrors('INVALID-EMAIL-OR-PASSWORD').INVALID_DATA);
    } else {
      const newUser = await registerNewUser(body.payload);
      return res.status(200).json({
        status: 200,
        message: 'user-registered-successfully',
        newUser,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      error: error.toString(),
    });
  }
};

export const LoginController = async (req: Request, res: Response, customParams: CustomRoutesProps) => {
  const { body } = req;
  try {
    if (!body.payload.email || !body.payload.password) {
      throw new Error(handleErrors('INVALID-EMAIL-OR-PASSWORD').INVALID_DATA);
    } else {
      const user = await loginUser(body.payload.email, body.payload.password);
      if (user) {
        const tokenPayload = { _id: user?._id, email: user.email };
        const expires = body.payload.remember ? {} : { expiresIn: 10800000 }
        const token = jwt.sign(tokenPayload, configs().jwtSecret,  expires);
        return res.status(200).json({
          status: 200,
          message: 'user-logged-successfully',
          user,
          token
        });
      }
      return;
    }
  } catch (error: any) {
    return res.status(400).json({
      error: error.toString(),
    });
  }
};

export const UpdateUserController = async (req: Request, res: Response, customParams: CustomRoutesProps) => {
  const { body } = req;
  try {
    if (!body.payload.email) {
      throw new Error(handleErrors('INVALID-EMAIL-OR-PASSWORD').INVALID_DATA);
    } else {
      const user = await updateUserResolver(body.payload);
      return res.status(200).json({
        status: 200,
        user,
        message: 'user-updated-successfully',
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      error: error.toString(),
    });
  }
};

export const DeleteUserController = async (req: Request, res: Response, customParams: CustomRoutesProps) => {
  const { body } = req;
  try {
    if (!body.payload.email) {
      throw new Error(handleErrors('INVALID-EMAIL-OR-PASSWORD').INVALID_DATA);
    } else {
      await deleteUser(body.payload.email);
      return res.status(200).json({
        status: 200,
        message: 'user-deleted-successfully',
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      error: error.toString(),
    });
  }
};
