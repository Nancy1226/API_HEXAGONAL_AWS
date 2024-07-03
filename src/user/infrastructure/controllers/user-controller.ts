import { Request, Response, NextFunction } from 'express';
import CreateUserUseCase from '../../application/create-user-usecase';
import GetUserListUseCase from '../../application/get-userlist-usecase';
import { GetUserByID } from '../../application/get-userById-usecase';
import UpdateUserUseCase from '../../application/update-user-usecase';
import DeleteUserUseCase from '../../application/delete-user-usecase';

class UserController {
  constructor(
    private getUserListUseCase: GetUserListUseCase,
    private createUserUseCase: CreateUserUseCase,
    private getUserByID: GetUserByID,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userPayload = req.body;
      const user = await this.createUserUseCase.execute(userPayload);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.getUserListUseCase.execute();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.getUserByID.run(req.params.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const userPayload = req.body;
      const updatedUser = await this.updateUserUseCase.execute(userId, userPayload);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.params.id;
      const result = await this.deleteUserUseCase.execute(userId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    }
  }
  
}

export default UserController;
