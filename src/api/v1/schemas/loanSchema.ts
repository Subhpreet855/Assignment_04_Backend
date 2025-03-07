import Joi, { ObjectSchema } from "joi";

// Schema for creating a new loan
export const createLoanSchema: ObjectSchema = Joi.object({
  borrowerId: Joi.string().required().messages({
    "any.required": "Borrower ID is required",
    "string.empty": "Borrower ID cannot be empty",
  }),
  amount: Joi.number().positive().precision(2).required().messages({
    "any.required": "Loan amount is required",
    "number.base": "Loan amount must be a number",
    "number.positive": "Loan amount must be greater than zero",
  }),
  interestRate: Joi.number().min(0).max(100).required().messages({
    "any.required": "Interest rate is required",
    "number.base": "Interest rate must be a number",
    "number.min": "Interest rate cannot be negative",
    "number.max": "Interest rate cannot exceed 100%",
  }),
  termMonths: Joi.number().integer().positive().required().messages({
    "any.required": "Loan term (in months) is required",
    "number.base": "Loan term must be a number",
    "number.positive": "Loan term must be greater than zero",
  }),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending")
    .messages({
      "any.only": 'Status must be either "pending", "approved", or "rejected"',
    }),
});

// Schema for updating a loan
export const updateLoanSchema: ObjectSchema = Joi.object({
  amount: Joi.number().positive().precision(2).messages({
    "number.base": "Loan amount must be a number",
    "number.positive": "Loan amount must be greater than zero",
  }),
  interestRate: Joi.number().min(0).max(100).messages({
    "number.base": "Interest rate must be a number",
    "number.min": "Interest rate cannot be negative",
    "number.max": "Interest rate cannot exceed 100%",
  }),
  termMonths: Joi.number().integer().positive().messages({
    "number.base": "Loan term must be a number",
    "number.positive": "Loan term must be greater than zero",
  }),
  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .messages({
      "any.only": 'Status must be either "pending", "approved", or "rejected"',
    }),
});

// Schema for deleting a loan (by ID)
export const deleteLoanSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Loan ID is required",
  }),
});

// Schema for validating loan model (used internally)
export const loanModelSchema: ObjectSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "Loan ID is required",
  }),
  borrowerId: Joi.string().required(),
  amount: Joi.number().positive().precision(2).required(),
  interestRate: Joi.number().min(0).max(100).required(),
  termMonths: Joi.number().integer().positive().required(),
  status: Joi.string().valid("pending", "approved", "rejected").default("pending"),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
});

// Schema for reviewing a loan (new schema)
export const reviewLoanSchema: ObjectSchema = Joi.object({
  reviewComments: Joi.string().required().messages({
    "any.required": "Review comments are required",
    "string.empty": "Review comments cannot be empty",
  }),
  reviewDate: Joi.date().default(() => new Date()).messages({
    "date.base": "Review date must be a valid date",
  }),
});

// Schema for approving a loan (new schema)
export const approveLoanSchema: ObjectSchema = Joi.object({
  approvedAmount: Joi.number().positive().precision(2).required().messages({
    "any.required": "Approved amount is required",
    "number.base": "Approved amount must be a number",
    "number.positive": "Approved amount must be greater than zero",
  }),
  approvalDate: Joi.date().default(() => new Date()).messages({
    "date.base": "Approval date must be a valid date",
  }),
  approvalComments: Joi.string().optional().messages({
    "string.empty": "Approval comments cannot be empty",
  }),
});
