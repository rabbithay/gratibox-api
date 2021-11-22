/* eslint-disable no-unused-vars */
import * as planRepository from '../repositories/plan';
import * as productRepository from '../repositories/product';
import validateBearerToken from '../schemas/authSchema';
import validateNewPlanInfo from '../schemas/planSchema';

export function checkAuth(bearerToken) {
  if (bearerToken === undefined) return true;
  const unauthorized = validateBearerToken(bearerToken);
  return unauthorized;
}

export function checkPlanInfo(body) {
  const invalidBody = validateNewPlanInfo(body);
  return !!invalidBody;
}

export async function signPlan(planInfo) {
  await planRepository.createPlan(planInfo);
  await productRepository.addUserProducts(planInfo);
}
