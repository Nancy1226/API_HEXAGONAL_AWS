import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../domain/user';

export interface UserDocument extends User, Document {
  id: number | null;
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserDocument>('users', UserSchema);