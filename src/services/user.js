/* eslint-disable no-unused-vars */
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/user';
import * as schemas from '../schemas/userSchema';

export function checkRegisterInfo(user) {
  const invalidUserInfo = schemas.validalidateNewUserInfo(user);
  return !!invalidUserInfo;
}

export async function searchUserByEmail(email) {
  return userRepository.searchUserByEmail(email);
}

export async function checkEmailIsRepeated(email) {
  const emailList = await searchUserByEmail(email);
  return (emailList.length !== 0);
}

export async function createNewUser(userInfo) {
  await userRepository.insertUser(userInfo);
}

export function checkLoginInfo(user) {
  const invalidUserInfo = schemas.validateLoginInfo(user);
  return !!invalidUserInfo;
}
