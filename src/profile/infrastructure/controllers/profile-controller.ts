// publication-controller.ts
import { Request, Response, NextFunction } from 'express';
import CreateProfileUseCase from '../../application/create-profile-usecase';
import GetProfileListUseCase from '../../application/get-profilelist-usecase';
import { GetProfileByID } from '../../application/get-profileById-usecase';
import UpdateProfileUseCase from '../../application/update-profile-usecase';
import DeleteProfileUseCase from '../../application/delete-profile-usecase';
import { LocalFileStorage } from '../adapters/storages/local-file-storage';
import { S3FileStorage } from '../adapters/storages/s3-file-storage';

const localFileStorage = new LocalFileStorage();
const s3FileStorage = new S3FileStorage();


class ProfileController {
  constructor(
    private getProfileListUseCase: GetProfileListUseCase,
    private createProfileUseCase: CreateProfileUseCase,
    private getProfileByID: GetProfileByID,
    private updateProfileUseCase: UpdateProfileUseCase,
    private deleteProfileUseCase: DeleteProfileUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const profilePayload = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).send('No file uploaded');
      }

      // Guardar archivo localmente
      const localFilePath = await localFileStorage.uploadFile(file);

      // Subir imagen a S3
      const s3FilePath = await s3FileStorage.uploadFile(file);

      const profileData = { ...profilePayload, image: localFilePath, image_s3: s3FilePath };
      const profile = await this.createProfileUseCase.execute(profileData);

      res.status(201).json(profile);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Perfil creado con exitosamente")
      }
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profiles = await this.getProfileListUseCase.execute();
      res.json(profiles);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await this.getProfileByID.run(req.params.id);
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const profileId = req.params.id;
      const profilePayload = req.body;
      const file = req.file;

      // Obtener la publicación existente
      const existingProfile = await this.getProfileByID.run(profileId);
      if (!existingProfile) {
        return res.status(404).send('Profile not found');
      }

      // Eliminar imagen antigua si existe una nueva
      if (file) {
        await localFileStorage.deleteFile(existingProfile.image);
        await s3FileStorage.deleteFile(existingProfile.image_s3);

        // Guardar archivo localmente
        const localFilePath = await localFileStorage.uploadFile(file);

        // Subir imagen a S3
        const s3FilePath = await s3FileStorage.uploadFile(file);

        profilePayload.image = localFilePath;
        profilePayload.image_s3 = s3FilePath;
      }

      const updatedProfile = await this.updateProfileUseCase.execute(profileId, profilePayload);
      res.json(updatedProfile);
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Perfil creado con exitosamente");
      }
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void | any> {
    try {
      const profileId = req.params.id;

      // Obtener la publicación existente
      const existingProfile = await this.getProfileByID.run(profileId);
      if (!existingProfile) {
        return res.status(404).send('Profile not found');
      }

      // Eliminar imagen de S3
      await s3FileStorage.deleteFile(existingProfile.image_s3);

      // Eliminar imagen del almacenamiento local
      await localFileStorage.deleteFile(existingProfile.image);

      const result = await this.deleteProfileUseCase.execute(profileId);
      res.status(result ? 200 : 404).json({ success: result });
    } catch (error) {
      next(error);
    } finally {
      if (req.file) {
        console.log("Perfil creado con exito");
      }
    }
  }

}

export default ProfileController;
