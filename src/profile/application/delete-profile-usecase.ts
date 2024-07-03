import { ProfileRepository } from '../domain/ports/profile-repository';

class DeleteProfileUseCase {
  constructor(private profileRepository: ProfileRepository) {}

  async execute(profileId: string): Promise<boolean> {
    const result = await this.profileRepository.delete(profileId);

    if (!result) {
      throw new Error(`No se pudo eliminar la perfil con id: ${profileId}`);
    }

    console.log(`Perfil con id: ${profileId} ha sido eliminado`);
    return result; // Devuelve un booleano
  }
}

export default DeleteProfileUseCase;
