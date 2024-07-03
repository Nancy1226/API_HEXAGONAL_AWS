import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userPayload: Omit<User, 'id'>): Promise<User> {
    const user = new User(
      null, // En MongoDB, el ID se genera automáticamente
      userPayload.name,
      userPayload.email,
      userPayload.password
    );

    return this.userRepository.create(user);
  }
}

export default CreateUserUseCase;
