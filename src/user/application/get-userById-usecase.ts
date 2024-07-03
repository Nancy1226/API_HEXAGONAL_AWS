import { UserRepository } from "../domain/user-repository";

export class GetUserByID {
  constructor(private readonly userRepository: UserRepository) {}

  async run(userId: string) {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error(`Id: ${userId} de usuario no encontrada`); //Lanza el error
    }
    // En el caso de que exista imprimira el email de este
    console.log(user);
    
    return this.userRepository.getUserById(userId);
  }
  
}
