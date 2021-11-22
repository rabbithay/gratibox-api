/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as userService from '../services/user';

export async function register(req, res) {
  const userInfo = req.body;

  const userInfoIsInvalid = userService.checkRegisterInfo(userInfo);
  if (userInfoIsInvalid) return res.sendStatus(406);

  const emailIsRepeated = await userService.checkEmailIsRepeated(userInfo.email);
  if (emailIsRepeated) return res.sendStatus(409);

  await userService.createNewUser(userInfo);
  return res.sendStatus(201);
}

export async function login(req, res) {
  const loginInfo = req.body;

  const userInfoIsInvalid = userService.checkLoginInfo(loginInfo);
  if (userInfoIsInvalid) return res.sendStatus(406);

  const userInfo = await userService.login(loginInfo);
  if (!userInfo) return res.sendStatus(401);

  return res.status(200).send(userInfo);
}
