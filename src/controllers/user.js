/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as userService from '../services/user';

// eslint-disable-next-line import/prefer-default-export
export async function register(req, res) {
  const userInfo = req.body;

  const userInfoIsInvalid = userService.checkRegisterInfo(userInfo);
  if (userInfoIsInvalid) return res.sendStatus(406);

  const emailIsRepeated = await userService.checkEmailIsRepeated(userInfo.email);
  if (emailIsRepeated) return res.sendStatus(409);

  await userService.createNewUser(userInfo);
  return res.sendStatus(201);
}
