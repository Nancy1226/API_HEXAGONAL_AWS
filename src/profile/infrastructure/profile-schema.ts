import mongoose, { Schema, Document } from 'mongoose';
import { Profile } from '../domain/profile';

export interface ProfileDocument extends Profile, Document {
  id: number | null;
  name: string;
  lastname: string;
  image: string;
  image_s3: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  image_s3: { type: String, required: true },
});

export const ProfileModel = mongoose.model<ProfileDocument>('profiles', UserSchema);