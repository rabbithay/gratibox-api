import Joi from 'joi';

export default function validateNewPlanInfo(obj) {
  const schema = Joi.object({
    user_id: Joi.number().integer().positive(),
    plan_type: Joi.string().valid('weekly', 'monthly'),
    delivery_day: Joi.number().integer().positive().valid(1, 2, 3),
    products: Joi.array().items(Joi.number().integer().positive()),
    full_user_name: Joi.string().required(),
    address: Joi.string().required(),
    cep: Joi.string().required().length(8),
    city: Joi.string().required(),
    state: Joi.string().required(),
  });

  const validation = schema.validate(obj);
  return validation.error;
}
