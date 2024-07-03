// infrastructure/mysql-publication-repository.ts
import { query } from '../../databases/mysql';
import { Profile } from "../../../domain/profile";
import { ProfileRepository } from "../../../domain/ports/profile-repository";

export class MySQLProfileRepository implements ProfileRepository {
  
  async getAll(): Promise<Profile[]> {
    const sql = 'SELECT * FROM profile';
    const rows = await query(sql, []) as any[]; // Ajuste de tipo aquí
    
    return rows.map((row: any) => new Profile(
      row.id,
      row.name,
      row.lastname,
      row.image,
      row.image_s3
    ));
  }

  async getById(id: string): Promise<Profile | null> {
    const sql = 'SELECT * FROM profile WHERE id = ?';
    const params = [id];
    const [rows]: any[] = await query(sql, params);
    
    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return new Profile(
      row.id,
      row.name,
      row.lasname,
      row.image,
      row.image_s3
    );
  }

  async create(profile: Profile): Promise<Profile> {
    const sql = 'INSERT INTO profile (name, lastname, image, image_s3) VALUES (?, ?, ?, ?)';
    const params = [profile.name, profile.lastname, profile.image, profile.image_s3];
    const result: any = await query(sql, params);

    return new Profile(result.insertId, profile.name, profile.lastname, profile.image, profile.image_s3);
  }

  async update(id: string, profile: Partial<Profile>): Promise<Profile | null> {
    const sql = `UPDATE profile SET 
                 name = COALESCE(?, name), 
                 lastname = COALESCE(?, lastname), 
                 image = COALESCE(?, image), 
                 image_s3 = COALESCE(?, image_s3) 
                 WHERE id = ?`;
    const params = [
      profile.name,
      profile.lastname,
      profile.image,
      profile.image_s3,
      id
    ];
    const result: any = await query(sql, params);

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.getById(id); // Obtener la publicación actualizada para devolverla
  }

  async delete(id: string): Promise<boolean> {
    const sql = "DELETE FROM profile WHERE id = ?";
    const params = [id];
    const result: any = await query(sql, params);

    return result.affectedRows > 0;
  }
}
