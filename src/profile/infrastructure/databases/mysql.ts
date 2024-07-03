import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Asegurarse de que las variables de entorno están definidas
for (const key of ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DATABASE']) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

// Convertir MYSQL_PORT de string a number
const config = {
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),  // Asegurarse de que port es un número
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const query = async (sql: string, params: any[]) => {
  console.log('Connecting to MySQL');
  const conn = await mysql.createConnection(config);
  try {
    const [rows] = await conn.execute<any[]>(sql, params);
    return rows;
  } catch (error) {
    console.error('MySQL query error:', error);
    throw error;
  } finally {
    console.log('Closing MySQL connection');
    await conn.end();
  }
};
