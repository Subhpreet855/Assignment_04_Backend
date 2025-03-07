import { Request, Response, NextFunction } from "express";
import * as loanService from "../services/loanService";
import { successResponse, errorResponse } from "../models/responsemodel";
import type { Loan } from "../interface/loanInterface";

/**
 * Handles retrieving all loan applications.
 */
export const getLoans = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loans: Loan[] = await loanService.fetchAllLoans();
        res.status(200).json(successResponse(loans, "Loans retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles creating a new loan application.
 */
export const createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newLoan: Loan = await loanService.createLoan(req.body);
        res.status(201).json(successResponse(newLoan, "Loan application created"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles reviewing a loan application.
 */
export const reviewLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loanId = req.params.id;
        const reviewedLoan: Loan | null = await loanService.reviewLoan(loanId);

        if (!reviewedLoan) {
            res.status(404).json(errorResponse("Loan application not found"));
            return;
        }

        res.status(200).json(successResponse(reviewedLoan, "Loan application reviewed"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles approving a loan application.
 */
export const approveLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loanId = req.params.id;
        const approvedLoan: Loan | null = await loanService.approveLoan(loanId);

        if (!approvedLoan) {
            res.status(404).json(errorResponse("Loan application not found"));
            return;
        }

        res.status(200).json(successResponse(approvedLoan, "Loan application approved"));
    } catch (error) {
        next(error);
    }
};
