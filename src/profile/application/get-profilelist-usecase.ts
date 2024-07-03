import { Profile } from '../domain/profile';
import {ProfileRepository} from '../domain/ports/profile-repository';

class GetProfileListUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(): Promise<Profile[]> {
    return this.profileRepository.getAll();
  }
}

export default GetProfileListUseCase;
