// CONTIENE LA INSTANCIA DE TODAS LAS DEPENDENCIAS QUE SE ESTARAN UTILIZANDO
import CreateUserUseCase from "../application/create-user-usecase";
import DeleteUserUseCase from "../application/delete-user-usecase";
import { GetUserByID } from "../application/get-userById-usecase";
import GetUserListUseCase from "../application/get-userlist-usecase";
import UpdateUserUseCase from "../application/update-user-usecase";
import UserController from "./controllers/user-controller";
import { RepositoryFactory } from "./repository-factory";

const userFactoryRepository = RepositoryFactory.createUserRepository(); // Esta implemeta el userRepository que necesita el caso de uso
// const mySqlUserReposritory = new MySQLUserRepository();

export const getUserListUseCase = new GetUserListUseCase(
  userFactoryRepository
  // mySqlUserReposritory
); //Instancia del Caso de Uso - Se le pasa el user-repository que necesita

export const createUserUseCase = new CreateUserUseCase(
  userFactoryRepository
  // mySqlUserReposritory
);

export const getUserById = new GetUserByID(
  userFactoryRepository
  // mySqlUserReposritory
);

export const updateUser = new UpdateUserUseCase(
  userFactoryRepository
  // mySqlUserReposritory
);

export const deleteUser = new DeleteUserUseCase(
  userFactoryRepository
  // mySqlUserReposritory
);

export const userController = new UserController(getUserListUseCase, createUserUseCase, getUserById, updateUser, deleteUser); 
