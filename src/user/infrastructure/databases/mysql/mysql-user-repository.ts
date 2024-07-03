import { query } from './mysql';
import { User } from "../../../domain/user";
import { UserRepository } from "../../../domain/user-repository";

export class MySQLUserRepository implements UserRepository {

  async getAll(): Promise<User[]> {
    const sql = 'SELECT * FROM users';
    const rows = await query(sql, []) as any[];
    console.log('=>', rows);
    // if (rows.length === 0) {
    //   return null;
    // }

    return rows.map((row: any) => new User(
      row.id,
      row.name,
      row.email,
      row.password
    ));
    // falta retornar null
  }

  async create(user: User): Promise<User> {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const params = [user.name, user.email, user.password];
    const result: any = await query(sql, params);
    // if (result.length === 0) {
    //   return null;
    // }

    return new User(result.insertId, user.name, user.email, user.password);
  }

  async getUserById(id: string): Promise<User | null> {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const params = [id];
    // const [rows]: any = await query(sql, params);
    const rows = await query(sql, params) as any[];
    // const [rows]: any[] = await query(sql, params);
    
    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const user = new User(
      row.id,
      row.name,
      row.email,
      row.password
    );
    console.log(user);

    return user;
  }

  async updateUser(id: string, newUser: Partial<User>): Promise<User | null> {
    const sql = "UPDATE users SET name=?, email=?, password=? WHERE id = ?";
    const params = [newUser.name, newUser.email, newUser.password, id];
    const result: any = await query(sql, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.getUserById(id); // Obtener el usuario actualizado para devolverlo
  }

  async deleteUser(id: string): Promise<boolean> {
    const sql = "DELETE FROM users WHERE id = ?";
    const params = [id];
    const result: any = await query(sql, params);

    return result.affectedRows > 0;
  }
}
