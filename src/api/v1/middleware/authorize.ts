// External library imports
import { Request, Response, NextFunction } from "express";

// Internal module imports
import { AuthorizationOptions } from "../models/authorizationOptions";
import { MiddlewareFunction } from "../types/express";
import { AuthorizationError } from "../error/error";

/**
 * Middleware to check if a user is authorized based on their role or UID.
 * @param {AuthorizationOptions} opts - The authorization options.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} The middleware function.
 */
export function isAuthorized(opts: AuthorizationOptions): MiddlewareFunction {
    return (req: Request, res: Response, next: NextFunction) => {
        // ... (Implementation details in the next steps) ...
        const { role, uid } = res.locals;
        const { id  } = req.params
        
        // allow if the same user is accessing their own data
        if (opts.allowSameUser && id && uid === id){
            return next();
        }
        // if no role exists on the user , throw tha 403 Forbidden response
        if (!role){
            throw new AuthorizationError("Forbidden: No role found", "ROLE_NOT_FOUND")
        }
        // Check if the user's role matches one of the allowed rules
        if (opts.hasRole.includes(role)){
            return next();
        }
        // if the role is not authorized, throw a 403 Forbidden response
        throw new AuthorizationError(
            "Forbidden: Insufficient role",
            "INSUFFICIENT_ROLE"
        )
    };
}
 
export default isAuthorized;
 