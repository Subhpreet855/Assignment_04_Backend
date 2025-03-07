import express, { Request, Response, NextFunction } from "express";
import {
  createLoan,
  getLoans,
  reviewLoan,
  approveLoan,
} from "../controllers/loanController";
import { validateRequest } from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";
import {
  createLoanSchema,
  reviewLoanSchema,
  approveLoanSchema,
} from "../schemas/loanSchema";

const router = express.Router();

/**
 * @openapi
 * /api/v1/loans:
 *   post:
 *     summary: Create a new loan application
 *     tags: [Loans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               term:
 *                 type: number
 *               purpose:
 *                 type: string
 *     responses:
 *       201:
 *         description: Loan application created successfully
 *       400:
 *         description: Validation error
 */
router.post(
  "/",
  authenticate,
  authorize({ hasRole: ["user"] }),
  validateRequest(createLoanSchema),
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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of loan applications
 */
router.get(
  "/",
  authenticate,
  authorize({ hasRole: ["officer", "Manager"] }),
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
 *     security:
 *       - bearerAuth: []
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
  authorize({ hasRole: ["officer"] }),
  validateRequest(reviewLoanSchema),
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
 *     security:
 *       - bearerAuth: []
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
  authorize({ hasRole: ["Manager"] }),
  validateRequest(approveLoanSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    await approveLoan(req, res, next);
  }
);

export default router;
