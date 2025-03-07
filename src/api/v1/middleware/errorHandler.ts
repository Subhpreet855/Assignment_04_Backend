import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/responsemodel";
import { ValidationError, NotFoundError, AppError } from "../types/error"; 

interface ExtendedError extends Error {
    code?: string; // Optional custom error code
    statusCode?: number; // HTTP status code for the error
}

const errorHandler = (
    err: ExtendedError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = err.statusCode || 500; // Default to 500 for unspecified errors
    let code = err.code || "UNKNOWN_ERROR"; // Default error code
    let message = "An unexpected error occurred. Please try again."; 

    // Handle specific error types for better error responses
    if (err instanceof ValidationError) {
        statusCode = 400;
        message = err.message;
        code = "VALIDATION_ERROR";
    } else if (err instanceof NotFoundError) {
        statusCode = 404;
        message = err.message;
        code = "NOT_FOUND";
    } else if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        code = err.code;
    }

    // Log the error for debugging purposes
    console.error(`Error: ${message} (Code: ${code})`);

    //Respond with a structured JSON error message
    res.status(statusCode).json(
        errorResponse(message, code) // Return meaningful error messages
    );
};

export default errorHandler;
