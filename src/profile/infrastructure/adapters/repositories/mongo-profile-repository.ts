// infrastructure/mongo-publication-repository.ts
import { ProfileRepository } from '../../../domain/ports/profile-repository';
import { Profile } from '../../../domain/profile';
import { ProfileModel } from '../../profile-schema';

export class MongoProfileRepository implements ProfileRepository {
  async getAll(): Promise<Profile[]> {
    const profiles = await ProfileModel.find();
    return profiles.map(pub => new Profile(pub.id, pub.name, pub.lastname, pub.image, pub.image_s3));
  }

  async getById(id: string): Promise<Profile | null> {
    const profile = await ProfileModel.findById(id);
    return profile ? new Profile(profile.id, profile.name, profile.lastname, profile.image, profile.image_s3) : null;
  }

  async create(profile: Profile): Promise<Profile> {
    const newProfile = new ProfileModel(profile);
    const savedProfile = await newProfile.save();
    return new Profile(savedProfile.id, savedProfile.name, savedProfile.lastname, savedProfile.image, savedProfile.image_s3);
  }

  async update(id: string, profile: Partial<Profile>): Promise<Profile | null> {
    const updatedProfile = await ProfileModel.findByIdAndUpdate(id, profile, { new: true });
    return updatedProfile ? new Profile(updatedProfile.id, updatedProfile.name, updatedProfile.lastname, updatedProfile.image, updatedProfile.image_s3) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProfileModel.findByIdAndDelete(id);
    return result !== null;
  }
}
