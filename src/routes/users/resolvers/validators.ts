/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDocument, UserDocumentValidationInterface } from '../../typesDefs/users/types';

const validateEmail = (string: any): string => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(string) || !(typeof string === 'string')) {
    throw new Error('Missing-or-incorrect-email');
  }
  return string;
};

export const validateString = (string: any, label: string): string => {
  if (typeof string !== 'string') {
    throw new Error(`Missing or incorrect ${label}`);
  }
  return string;
};

const userValidationInterface: UserDocumentValidationInterface = {
  name: (parameter: any) => validateString(parameter, 'name'),
  email: (parameter: any) => validateEmail(parameter),
  description: (parameter: any) => validateString(parameter, 'description'),
  phoneNumber: (parameter: any) => validateString(parameter, 'phoneNumber'),
  address: (parameter: any) => validateString(parameter, 'address'),
  country: (parameter: any) => validateString(parameter, 'country'),
  food: (parameter: any) => validateString(parameter, 'food'),
  color: (parameter: any) => validateString(parameter, 'color'),
  hobby: (parameter: any) => validateString(parameter, 'hobby'),
  image: (parameter: any) => validateString(parameter, 'image'),
};

export const validateParcialUser = (body: any): Partial<UserDocument> => {
  const keys = Object.keys(body);
  const partialUser: any = new Object();
  keys.forEach((k) => {
    partialUser[k] = userValidationInterface?.[k as keyof typeof userValidationInterface]?.(body[k]);
  });
  return partialUser;
}

export const validateUser = (user: any): UserDocument => {
  const object = { ...user }
  delete object.favorites;
  const keys1 = Object.keys(object);
  const keys2 = Object.keys(user?.favorites);
  const newUser: any = new Object();
  keys1.forEach((k) => {
    newUser[k] = userValidationInterface?.[k as keyof typeof userValidationInterface]?.(user[k]);
  });
  keys2.forEach((k) => {
    newUser[k] = userValidationInterface?.[k as keyof typeof userValidationInterface]?.(user.favorites[k]);
  });
  return newUser;
};
