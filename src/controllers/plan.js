/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as planService from '../services/plan';

// eslint-disable-next-line import/prefer-default-export
export async function signPlan(req, res) {
  const auth = req.headers.authorization;

  const unauthorized = planService.checkAuth(auth);
  if (unauthorized) return res.sendStatus(401);
}
