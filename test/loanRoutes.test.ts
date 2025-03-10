import request from "supertest";
import app from "../src/app"; 
import { Request, Response, NextFunction } from "express";
import * as loanController from "../src/api/v1/controllers/loanController";

jest.mock("../src/api/v1/controllers/loanController", () => ({
  createLoan: jest.fn((req, res) => res.status(201).send({
    message: "Loan application created successfully",
    data: { id: "123456789", borrowerId: "user_01", amount: 50000, status: "Pending" }
  })),
  getLoans: jest.fn((req, res) => res.status(200).send([
    { id: "1", borrowerId: "user_01", amount: 50000, status: "Pending" },
    { id: "2", borrowerId: "user_02", amount: 100000, status: "Approved" }
  ])),
  reviewLoan: jest.fn((req, res) => res.status(200).send({ message: "Loan reviewed successfully." })),
  approveLoan: jest.fn((req, res) => res.status(200).send({ message: "Loan approved successfully." }))
}));

jest.mock("../src/api/v1/middleware/authenticate", () => {
  return jest.fn((req: Request, res: Response, next: NextFunction) => next());
});

jest.mock("../src/api/v1/middleware/authorize", () => {
  return jest.fn(() => (req: Request, res: Response, next: NextFunction) => next());
});

describe("Loan Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/loans", () => {
    it("should call createLoan controller", async () => {
      const mockLoan = {
        borrowerId: "user_01",
        amount: 50000,
        termMonths: 12,
        interestRate: 5.5,
        purpose: "Business expansion"
      };

      await request(app)
        .post("/api/v1/loans")
        .set("Authorization", "Bearer mockedToken")
        .send(mockLoan);

      expect(loanController.createLoan).toHaveBeenCalled();
    });
  });

  describe("GET /api/v1/loans", () => {
    it("should call getLoans controller", async () => {
      await request(app)
        .get("/api/v1/loans")
        .set("Authorization", "Bearer mockedToken");

      expect(loanController.getLoans).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/loans/:id/review", () => {
    it("should call reviewLoan controller", async () => {
      const reviewData = { status: "Approved", comments: "Verified documents" };

      await request(app)
        .put("/api/v1/loans/1/review")
        .set("Authorization", "Bearer mockedToken")
        .send(reviewData);

      expect(loanController.reviewLoan).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/loans/:id/approve", () => {
    it("should call approveLoan controller", async () => {
      const approveData = { approved: true };

      await request(app)
        .put("/api/v1/loans/1/approve")
        .set("Authorization", "Bearer mockedToken")
        .send(approveData);

      expect(loanController.approveLoan).toHaveBeenCalled();
    });
  });
});