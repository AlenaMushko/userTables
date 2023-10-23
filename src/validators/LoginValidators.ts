import Joi from 'joi';

export const LoginValidators = Joi.object({
    username: Joi.string().min(1).max(150).required().messages({
        'string.min': 'Name must be at least {#limit} characters',
        'string.max': 'Name must be at most {#limit} characters',
        'string.required': 'Name is required',
    }),
    password: Joi.string().min(1).max(128)
        .required()
        .messages({
            'string.pattern.base':
                'Password must have at least one uppercase letter, one lowercase letter, one digit, and be between 7 to 20 characters long',
            'string.required': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters',
            'string.max': 'Password must be at most {#limit} characters',
        }),
});
