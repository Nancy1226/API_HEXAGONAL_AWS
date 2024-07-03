import { User } from "./user";

// INTERFAS --> Para acceder a base de datos
export interface UserRepository {
  // Metodo para obtener una promesa con todos los usuarios
  getAll(): Promise<User[]>;

  // Metodo para crear un nuevo usuario
  create(user: User): Promise<User>;

  // Metodo para obtener un usuario por ID
  getUserById(userId: string): Promise<User | null>;
  
  // Metodo para actualizar un usuario por ID
  updateUser(userId: string, user: Partial<User>): Promise<User | null>;
  
  // Metodo para eliminar un usuario por ID
  deleteUser(userId: string): Promise<boolean>;
}

export default UserRepository;
