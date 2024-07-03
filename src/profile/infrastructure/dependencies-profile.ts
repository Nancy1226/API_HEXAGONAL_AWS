import CreateProfileUseCase from "../application/create-profile-usecase";
import DeleteProfileUseCase from "../application/delete-profile-usecase";
import { GetProfileByID } from "../application/get-profileById-usecase";
import GetProfileListUseCase from "../application/get-profilelist-usecase";
import UpdateProfileUseCase from "../application/update-profile-usecase";
import ProfileController from "./controllers/profile-controller";

import { RepositoryFactory } from "./adapters/repositories/repository-factory";

const profileRepository = RepositoryFactory.createProfileRepository();

export const getProfileListUseCase = new GetProfileListUseCase(
  profileRepository
);

export const createProfileUseCase = new CreateProfileUseCase(
  profileRepository
);

export const getProfileById = new GetProfileByID(
  profileRepository
);

export const updateProfile = new UpdateProfileUseCase(
  profileRepository
);

export const deleteProfile = new DeleteProfileUseCase(
  profileRepository
);

export const profileController = new ProfileController(
  getProfileListUseCase, 
  createProfileUseCase, 
  getProfileById, 
  updateProfile, 
  deleteProfile
);
