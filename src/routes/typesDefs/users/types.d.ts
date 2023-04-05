import { UserLevelsPermissions } from './enum';

export interface UserDocument {
  _id?: string
  name: string
  email: string
  description: string
  phoneNumber: string
  address: string
  country: string
  password?: string
  image?: string
  favorites: {
    food: string
    color: string
    hobby: string
  }
}

export type UserDocumentValidationInterface = {
  name: (parameter: any) => string
  email: (parameter: any) => string
  description: (parameter: any) => string
  phoneNumber: (parameter: any) => string
  address: (parameter: any) => string
  country: (parameter: any) => string
  food: (paramter: any) => string
  color: (paramter: any) => string
  hobby: (paramter: any) => string
  image?: (paramter: any) => string
};

export type UserDocumentWithoutPassword = Omit<UserDocument, 'password'>;

export type UserTokenPayload = {
  uid: string;
  email: string;
};
