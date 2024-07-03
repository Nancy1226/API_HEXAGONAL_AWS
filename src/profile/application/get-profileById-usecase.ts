import { ProfileRepository } from "../domain/ports/profile-repository";

export class GetProfileByID {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async run(profileId: string) {
    const profile = await this.profileRepository.getById(profileId);

    if (!profile) {
      throw new Error(`Id: ${profileId} del perfil no encontrado`); //Lanza el error
    }
    console.log(profile);
    
    return profile;
  }
  
}
