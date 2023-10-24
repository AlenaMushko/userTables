import Joi from 'joi';

export const UserValidators = Joi.object({
    name: Joi.string().min(1).max(255).required().messages({
        'string.min': 'Name must be at least {#limit} characters',
        'string.max': 'Name must be at most {#limit} characters',
        'string.required': 'Name is required',
    }),
    email: Joi.string().min(1).max(254).required().messages({
        'string.min': 'Email must be at least {#limit} characters',
        'string.max': 'Email must be at most {#limit} characters',
        'string.required': 'Email is required',
    }),
    birthday_date: Joi.date().iso().required()
        .messages({
            'date.base': 'Birthday must be a valid date.',
            'date.iso': 'Birthday must be in ISO 8601 format.',
            'string.required': 'Email is required',
        }),
    phone_number: Joi.string().min(1).max(20).required().messages({
        'string.min': 'Phone number must be at least {#limit} characters',
        'string.max': 'Phone number must be at most {#limit} characters',
        'string.required': 'Phone number is required',
    }),
    address: Joi.string().min(1).messages({
        'string.min': 'Address must be at least {#limit} characters',
    }),
});
