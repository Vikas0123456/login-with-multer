const Joi = require('joi');

const schema = Joi.object({
	id: Joi.string().required(),
	user_name: Joi.string().required(),
	email_id: Joi.string().email().lowercase().required(),
	password: Joi.string().min(7).required().strict(),
	image: Joi.string()
});

const usersValidate = async (req, res, next) => {
	const value = await schema.validate(req.body);
	if (value.error) {
		res.send({ error: value.error.details[0] });
	} else {
		next();
	}
};

module.exports = { usersValidate };
