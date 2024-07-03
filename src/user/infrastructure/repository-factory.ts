import { UserRepository } from "../domain/user-repository";
import { MongoUserRepository } from "./databases/mongo/mongo-user-repository";
import { MySQLUserRepository } from "./databases/mysql/mysql-user-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
  static createUserRepository(): UserRepository {
    if (db_type === 'mysql') {
      console.log("Estamos modo mysql")
      return new MySQLUserRepository();
    } else if (db_type === 'mongo') {
      console.log("Estamos modo mongo")
      return new MongoUserRepository();
    }
    throw new Error('Unsupported database type');
  }
}

