import express, { Request, Response, NextFunction } from "express";
import {
  createLoan,
  getLoans,
  reviewLoan,
  approveLoan,
} from "../controllers/loanController";
import { loanSchema } from "../schemas/loanSchema";
import { validateRequest } from "../middleware/validate";
import   authenticate  from "../middleware/authenticate";
import  isAuthorized  from "../middleware/authorize";


const router = express.Router();

/**
 * @openapi
 * /api/v1/loans:
 *   post:
 *     summary: Create a new loan application
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowerId:
 *                 type: string
 *               amount:
 *                 type: number
 *               termMonths:
 *                 type: number
 *               interestRate:
 *                 type: number
 *               purpose:
 *                 type: string
 *             required:
 *               - borrowerId
 *               - amount
 *               - termMonths
 *               - interestRate
 *     responses:
 *       201:
 *         description: Loan application created successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validation error: Borrower ID is required, Loan amount must be greater than zero, Interest rate is required, Loan term (in months) is required"
 */
router.post(
  "/",
  authenticate,
  isAuthorized({hasRole: ["user"]}),// validateRequest(loanSchema)
  async (req: Request, res: Response, next: NextFunction) => {
    await createLoan(req, res, next);
  }
);

/**
 * @openapi
 * /api/v1/loans:
 *   get:
 *     summary: Get all loan applications
 *     tags: [Loans]
 *     responses:
 *       200:
 *         description: List of loan applications
 */
router.get(
  "/",
   authenticate, 
   isAuthorized({ hasRole: ["officer", "Manager"] }), 
  async (req: Request, res: Response, next: NextFunction) => {
    await getLoans(req, res, next);
  }
);

/**
 * @openapi
 * /api/v1/loans/{id}/review:
 *   put:
 *     summary: Review a loan application
 *     tags: [Loans]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Loan application reviewed successfully
 *       403:
 *         description: Unauthorized access
 */
router.put(
  "/:id/review",
  authenticate, 
  isAuthorized({ hasRole: ["officer"] }), 
  //validateRequest(loanSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    await reviewLoan(req, res, next);
  }
);

/**
 * @openapi
 * /api/v1/loans/{id}/approve:
 *   put:
 *     summary: Approve a loan application
 *     tags: [Loans]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               approved:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Loan application approved successfully
 *       403:
 *         description: Unauthorized access
 */
router.put(
  "/:id/approve",
  authenticate, 
  isAuthorized({ hasRole: ["Manager"] }),
 // validateRequest(loanSchema), 
  async (req: Request, res: Response, next: NextFunction) => {
    await approveLoan(req, res, next);
  }
);

export default router;
