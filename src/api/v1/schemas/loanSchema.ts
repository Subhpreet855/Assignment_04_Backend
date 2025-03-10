import Joi, { ObjectSchema } from "joi";

export const loanSchema: ObjectSchema = Joi.object({
  id: Joi.string().optional().messages({
    "string.empty": "Loan ID cannot be empty.",
  }),

  borrowerId: Joi.string().required().messages({
    "any.required": "Borrower ID is required.",
    "string.empty": "Borrower ID cannot be empty.",
  }),

  amount: Joi.number().positive().required().messages({
    "any.required": "Loan amount is required.",
    "number.base": "Loan amount must be a number.",
    "number.positive": "Loan amount must be a positive number.",
  }),

  termMonths: Joi.number().integer().positive().required().messages({
    "any.required": "Loan term is required.",
    "number.base": "Loan term must be a number.",
    "number.positive": "Loan term must be a positive number.",
  }),

  interestRate: Joi.number().positive().required().messages({
    "any.required": "Interest rate is required.",
    "number.base": "Interest rate must be a number.",
    "number.positive": "Interest rate must be a positive number.",
  }),

  purpose: Joi.string().required().messages({
    "any.required": "Purpose is required.",
    "string.empty": "Purpose cannot be empty.",
  }),

  createdAt: Joi.date().iso().optional().messages({
    "date.base": "Created date must be a valid ISO date format.",
  }),

  updatedAt: Joi.date().iso().optional().messages({
    "date.base": "Updated date must be a valid ISO date format.",
  }),
});
