import './setup';
import express from 'express';
import cors from 'cors';

import * as userControllers from './controllers/user';
import * as planControllers from './controllers/plan';
import listProducts from './controllers/product';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', userControllers.register);

app.post('/login', userControllers.login);

app.post('/plan', planControllers.signPlan);

app.get('/products', listProducts);

app.get('/health', (req, res) => res.sendStatus(200));

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log({ error, request, response });
  return response.sendStatus(500);
});

export default app;
