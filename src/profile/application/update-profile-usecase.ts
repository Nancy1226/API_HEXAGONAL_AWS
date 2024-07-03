import { ProfileRepository } from '../domain/ports/profile-repository';
import { Profile } from '../domain/profile';

class UpdateProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(profileId: string, profilePayload: Partial<Profile>): Promise<Profile> {
    const result = await this.profileRepository.update(profileId, profilePayload);

    if (!result) {
      throw new Error(`Id: ${profileId} del perfil no encontrado`);
    }

    return result;
  }
}

export default UpdateProfileUseCase;
