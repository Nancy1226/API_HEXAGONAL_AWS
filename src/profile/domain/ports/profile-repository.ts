// domain/publication-repository.ts
import { Profile } from '../profile';

export interface ProfileRepository {
  getAll(): Promise<Profile[]>;
  getById(id: string): Promise<Profile | null>;
  create(profile: Profile): Promise<Profile>;
  update(id: string, profile: Partial<Profile>): Promise<Profile | null>;
  delete(id: string): Promise<boolean>;
}
