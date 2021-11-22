import * as planService from '../services/plan';

// eslint-disable-next-line import/prefer-default-export
export async function signPlan(req, res) {
  const auth = req.headers.authorization;

  const unauthorized = planService.checkAuth(auth);
  if (unauthorized) return res.sendStatus(401);

  const planInfo = req.body;
  const invalidParams = planService.checkPlanInfo(planInfo);
  if (invalidParams) return res.sendStatus(406);

  await planService.signPlan(planInfo);
  return res.sendStatus(201);
}
