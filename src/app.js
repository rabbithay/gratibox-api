import './setup';
import express from 'express';
import cors from 'cors';

import * as usersControllers from './controllers/user';
import * as planControllers from './controllers/plan';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', usersControllers.register);

app.post('/login', usersControllers.login);

app.post('/plan', planControllers.signPlan);

app.get('/health', (req, res) => res.sendStatus(200));

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  console.log({ error, request, response });
  return response.sendStatus(500);
});

export default app;
