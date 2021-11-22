import Joi from 'joi';

export function validalidateNewUserInfo(obj) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  });

  const validation = schema.validate(obj);
  return validation.error;
}

// não coloquei todos as verificações de senha aqui
// porque essa é uma responsabilidade do momento de criação do usuário.
// no login só faz realmente sentido verificar formato de email,
// para se caso o front falhar nessa verificação
// e permitir a tentativa do usuário com email inválido,
// ainda assim receba um retorno de erro coerente da api
export function validateLoginInfo(obj) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validation = schema.validate(obj);
  return validation.error;
}
