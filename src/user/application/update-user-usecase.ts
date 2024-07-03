import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, userPayload: Partial<User>): Promise<User> {
    const result = await this.userRepository.updateUser(userId, userPayload);

    if (!result) {
      throw new Error(`Id: ${userId} de usuario no encontrada`);
    }

    return result;
  }
}

export default UpdateUserUseCase;
