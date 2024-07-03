// src/file-storage/local-file-storage.ts
import { FileStorage } from '../../../domain/ports/file-storage'
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage: storage });

export class LocalFileStorage implements FileStorage {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return file.path;
  }

  async deleteFile(filePath: string): Promise<void> {
    fs.unlinkSync(filePath);
  }
}
