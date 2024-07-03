// src/file-storage/s3-file-storage.ts
import { FileStorage } from '../../../domain/ports/file-storage'
import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

export class S3FileStorage implements FileStorage {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const localPath = file.path;
    const fileKey = `images/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: 'arquihexa',
      Key: fileKey,
      Body: fs.createReadStream(localPath),
      ContentType: file.mimetype
    };

    const uploadResult = await s3.upload(params).promise();
    return uploadResult.Location;
  }

  async deleteFile(filePath: string): Promise<void> {
    const fileKey = path.basename(filePath);
    await s3.deleteObject({ Bucket: 'arquihexa', Key: `images/${fileKey}` }).promise();
  }
}



// PARA CUANDO TENGO AWS CLI CONFIGURADO EN MI ENTORNO
// import AWS from 'aws-sdk';

// // AWS SDK automáticamente usará las credenciales configuradas por AWS CLI
// export const s3 = new AWS.S3();
