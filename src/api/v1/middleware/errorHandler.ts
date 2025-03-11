import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/error";
import { HTTP_STATUS } from "../constants/httpConstants";
import { errorResponse } from "../models/responsemodel";

/**
 * Global error handling middleware for an Express application.
 * Catches all errors passed to next() and formats them into a consistent response format.
 *
 * @param err - The error object passed from previous middleware or route handlers
 * @param req - Express request object
 * @param res - Express response object
 * @param _next - Express next function (unused but required for Express error middleware signature)
 *
 * Features:
 * - Handles AppError and its subclasses with their specific status codes and messages
 * - Provides consistent error response format
 * - Logs errors for debugging
 *
 * @example
 * // In your Express app setup after all other middleware and controllers:
 * app.use(errorHandler);
 *
 * // In your route handlers:
 * router.get('/users/:id', async (req, res, next) => {
 *   try {
 *     // ... your logic
 *   } catch (error: unknown) {
 *     if (error instanceof RepositoryError) { // Or any other specific error if needed temporarily
 *       next(error);  // Will be handled as AppError
 *     } else {
 *       next(new ServiceError("User operation failed", "USER_ERROR", 400)); // Still works as ServiceError is an AppError
 *     }
 *   }
 * });
 */
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
	const statusCode = err.statusCode || 500; // Default to 500 for unspecified errors
	const code = err.code || "UNKNOWN_ERROR"; // Default error code

	// Log the error for debugging purposes
	console.error(`Error: ${err.message} (Code: ${code})`);

	// Respond with a structured JSON error message
	res.status(statusCode).json(
		errorResponse("An unexpected error occurred. Please try again.", code)
	);
};

export default errorHandler;