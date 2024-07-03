import { User } from '../domain/user';
import {UserRepository} from '../domain/user-repository';

class GetUserListUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.getAll();
  }
}

export default GetUserListUseCase;
