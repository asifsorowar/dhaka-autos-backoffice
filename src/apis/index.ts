import { callPostApi, callGetApi, callPutApi, callDeleteApi } from '../libs/api';
import { apiBaseUrl } from '../config/env';

export const login = (payload: { email: string; password: string }) =>
    callPostApi(apiBaseUrl + '/api/v1/auth/sign-in', payload, null, null, true);

export const resetPassword = () => {};

export const getModuleNames = () => callGetApi(apiBaseUrl + '/api/v1/permission-modules');

export const getPermissionTypes = () => callGetApi(apiBaseUrl + '/api/v1/permission-types');

export const getRoles = () => callGetApi(apiBaseUrl + '/api/v1/roles');

export const getFolderById = (folderId: number) => callGetApi(apiBaseUrl + '/api/v1/folders/' + folderId);

export const getProfile = (authorization: string) => callGetApi(apiBaseUrl + `/api/v1/user-profile`, authorization);

export const getBrands = () => callGetApi(apiBaseUrl + '/api/v1/car-brands');
export const getModels = () => callGetApi(apiBaseUrl + '/api/v1/car-models');

export const getCarById = (id: string) => callGetApi(apiBaseUrl + '/api/v1/cars/' + id);

export const getBlogById = (id: string) => callGetApi(apiBaseUrl + '/api/v1/blogs/' + id);
