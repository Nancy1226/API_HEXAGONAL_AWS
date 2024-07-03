import mysql from 'mysql2/promise';

const config = {
  host: 'database-api-hexagonal.cdf69l49jvum.us-east-1.rds.amazonaws.com',
  port: 3306,  // Asegúrate de usar el puerto correcto para MySQL
  user: 'admin', 
  password: 'myDBhexagonal21',
  database: 'storage_hexagonalBD',  // Este es el nombre de la base de datos que definiste al crear la instancia de RDS
};

export const query = async (sql: string, params: any[]) => {
  console.log('Connecting to MySQL');
  const conn = await mysql.createConnection(config);
  try {
    const [result] = await conn.execute(sql, params);
    return result;
  } finally {
    console.log('Closing MySQL connection');
    await conn.end();
  }
};
