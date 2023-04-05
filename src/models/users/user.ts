/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { UserDocument } from '../../routes/typesDefs/users/types';

// creating schema
const userCardSchema = new Schema({
  name: String,
  email: String,
  token: String,
  description: String,
  phoneNumber: String,
  address: String,
  country: String,
  password: String,
  image: String,
  favorites: {
    food: String,
    color: String,
    hobby: String
  }
});

export default model<UserDocument>('UserDocumentModel', userCardSchema);
