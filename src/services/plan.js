/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as planRepository from '../repositories/plan';
import validateBearerToken from '../schemas/authSchema';

export function checkAuth(bearerToken) {
  if (bearerToken === undefined) return true;
  const unauthorized = validateBearerToken(bearerToken);
  return unauthorized;
}

export async function example2() {
  //
}
