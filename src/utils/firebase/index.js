import { login } from './functions/auth';
import { destroyUser, detailUser, updateImage, updatePassword, updateUser } from './functions/user';

export const auth = { login };
export const user = { destroyUser, detailUser, updateImage, updatePassword, updateUser };
