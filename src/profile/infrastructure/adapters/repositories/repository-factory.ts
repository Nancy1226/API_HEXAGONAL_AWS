// infrastructure/repository-factory.ts
import { ProfileRepository } from "../../../domain/ports/profile-repository";
import { MongoProfileRepository } from "./mongo-profile-repository";
import { MySQLProfileRepository } from "./mysql-profile-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE; // memoria

export class RepositoryFactory {
  static createProfileRepository(): ProfileRepository {
    if (db_type === 'mysql') {
      console.log("Conexion con mysql")
      return new MySQLProfileRepository();
    } else if (db_type === 'mongo') {
      console.log("Conexion con mongo")
      return new MongoProfileRepository();
    }
    throw new Error('Unsupported database type');
  }
}

