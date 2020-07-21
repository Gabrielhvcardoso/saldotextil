import { read } from './announcement/read';
import { create } from './announcement/create';
import { update } from './announcement/update';
import { destroy } from './announcement/destroy';

import { destroyUser } from './user/destroy';
import { detailUser } from './user/detail';
import { updateUser } from './user/update';
import { updateImage } from './user/updateImage';
import { updatePassword } from './user/updatePassword';

import { tryLogin } from './auth/login';
import { tryRegister } from './auth/register';

export const announcement = {
  read, create, update, destroy,
};

export const user = {
  destroy: destroyUser,
  detail: detailUser,
  update: updateUser,
  updateImage,
  updatePassword,
};

export const auth = {
  login: tryLogin,
  register: tryRegister
};