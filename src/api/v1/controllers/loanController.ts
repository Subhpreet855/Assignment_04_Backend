import { Request, Response, NextFunction } from "express";
import * as loanService from "../services/loanService";
import { successResponse, errorResponse } from "../models/responsemodel";
import type { Loan } from "../interface/loanInterface";

/**
 * Handles retrieving all loan applications.
 */
export const getLoans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loans: Loan[] = await loanService.fetchAllLoans();
        return res.status(200).json(successResponse(loans, "Loans retrieved"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles creating a new loan application.
 */
export const createLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newLoan: Loan = await loanService.createLoan(req.body);
        return res.status(201).json(successResponse(newLoan, "Loan application created"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles reviewing a loan application.
 */
export const reviewLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loanId = req.params.id;

        if (!loanId) {
            return res.status(400).json(errorResponse("Loan ID is required"));
        }

        const reviewedLoan: Loan | null = await loanService.reviewLoan(loanId); // Removed req.body

        if (!reviewedLoan) {
            return res.status(404).json(errorResponse("Loan application not found"));
        }

        return res.status(200).json(successResponse(reviewedLoan, "Loan application reviewed"));
    } catch (error) {
        next(error);
    }
};

/**
 * Handles approving a loan application.
 */
export const approveLoan = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loanId = req.params.id;

        if (!loanId) {
            return res.status(400).json(errorResponse("Loan ID is required"));
        }

        const approvedLoan: Loan | null = await loanService.approveLoan(loanId); // Removed req.body

        if (!approvedLoan) {
            return res.status(404).json(errorResponse("Loan application not found"));
        }

        return res.status(200).json(successResponse(approvedLoan, "Loan application approved"));
    } catch (error) {
        next(error);
    }
};