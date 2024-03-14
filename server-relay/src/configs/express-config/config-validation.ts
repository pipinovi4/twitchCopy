import Joi from 'joi';

const schemaConfig = Joi.object({
    PORT: Joi.number().integer().min(1).max(65535).required(),
    PATH_TO_CERT: Joi.string().required(),
    PATH_TO_KEY: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
}).unknown(true);

export default () => {
    const { error } = schemaConfig.validate(process.env);

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
};

