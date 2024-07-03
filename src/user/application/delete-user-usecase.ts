import { UserRepository } from '../domain/user-repository';

class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<boolean> {
    const result = await this.userRepository.deleteUser(userId);

    if (!result) {
      throw new Error(`No se pudo eliminar el usuario con id: ${userId}`);
    }

    console.log(`Usuario con id: ${userId} ha sido eliminado`);
    return result; // Devuelve un booleano
  }
}

export default DeleteUserUseCase;
