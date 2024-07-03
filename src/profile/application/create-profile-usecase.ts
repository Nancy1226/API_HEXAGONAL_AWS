import { ProfileRepository } from '../domain/ports/profile-repository';
import { Profile } from '../domain/profile';

class CreateProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(userPayload: Omit<Profile, 'id' >): Promise<Profile> {
    const profile = new Profile(
      null, // En MongoDB, el ID se genera automáticamente
      userPayload.name,
      userPayload.lastname,
      userPayload.image,
      userPayload.image_s3
    );

    return this.profileRepository.create(profile);
  }
}

export default CreateProfileUseCase;
