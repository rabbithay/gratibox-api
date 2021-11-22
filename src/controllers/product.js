/* eslint-disable no-unused-vars */
import joi from 'joi';
import * as planService from '../services/plan';
import getProductsList from '../services/product';

export default async function listProducts(req, res) {
  const auth = req.headers.authorization;

  const unauthorized = planService.checkAuth(auth);
  if (unauthorized) return res.sendStatus(401);

  const productList = getProductsList();

  return res.status(200).send(productList);
}
