// mongo-user-repository.ts
import { User } from "../../../domain/user";
import { UserRepository } from '../../../domain/user-repository';
import { mongoose } from "./mongoDB";
import { UserModel } from "../../schemas/user-schema";

export class MongoUserRepository implements UserRepository {

  async getAll(): Promise<User[]> {
    const users = await UserModel.find();
   
    return users.map(user => new User(user.id, user.name, user.email, user.password));
  }

  async create(user: User): Promise<User> {
    try {
      if (mongoose.connection.readyState !== 1) {
        console.error('Mongoose is not connected');
        throw new Error('Database not connected');
      }
      const newUser = new UserModel({
        name: user.name,
        email: user.email,
        password: user.password
      });
      const savedUser = await newUser.save();
      return new User(savedUser.id, savedUser.name, savedUser.email, savedUser.password);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await UserModel.findById(userId);
    if (!user) {
      return null;
    }
    return new User(user.id, user.name, user.email, user.password);
  }

  async updateUser(userId: string, user: Partial<User>): Promise<User | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, user, { new: true });
    if (!updatedUser) {
      return null;
    }
    return new User(updatedUser.id, updatedUser.name, updatedUser.email, updatedUser.password);
  }

  async deleteUser(userId: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(userId);
    return result !== null;
  }
}
