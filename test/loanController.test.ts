import { Request, Response, NextFunction } from "express";
import * as loanController from "../src/api/v1/controllers/loanController";
import * as loanService from "../src/api/v1/services/loanService";
import { successResponse, errorResponse } from "../src/api/v1/models/responsemodel";

jest.mock("../src/api/v1/services/loanService");

let mockReq: Partial<Request>;
let mockRes: Partial<Response>;
let mockNext: NextFunction;

beforeEach(() => {
    jest.clearAllMocks();
    mockReq = { params: {}, body: {} };
    mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    mockNext = jest.fn();
});

describe("Loan Controller", () => {
    describe("getLoans", () => {
        it("should retrieve all loans", async () => {
            const mockLoans = [{ id: "1", amount: 1000, status: "pending" }];
            (loanService.fetchAllLoans as jest.Mock).mockResolvedValue(mockLoans);

            await loanController.getLoans(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(successResponse(mockLoans, "Loans retrieved"));
        });
    });

    describe("createLoan", () => {
        it("should create a new loan", async () => {
            const mockLoan = { id: "1", amount: 1000, status: "pending" };
            (loanService.createLoan as jest.Mock).mockResolvedValue(mockLoan);

            mockReq.body = { amount: 1000 };
            await loanController.createLoan(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(successResponse(mockLoan, "Loan application created"));
        });
    });

    describe("reviewLoan", () => {
        it("should review a loan", async () => {
            const mockLoan = { id: "1", amount: 1000, status: "reviewed" };
            (loanService.reviewLoan as jest.Mock).mockResolvedValue(mockLoan);

            mockReq.params = { id: "1" };
            await loanController.reviewLoan(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(successResponse(mockLoan, "Loan application reviewed"));
        });

        it("should return 404 if loan is not found", async () => {
            (loanService.reviewLoan as jest.Mock).mockResolvedValue(null);

            mockReq.params = { id: "1" };
            await loanController.reviewLoan(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Loan application not found"));
        });
    });

    describe("approveLoan", () => {
        it("should approve a loan", async () => {
            const mockLoan = { id: "1", amount: 1000, status: "approved" };
            (loanService.approveLoan as jest.Mock).mockResolvedValue(mockLoan);

            mockReq.params = { id: "1" };
            await loanController.approveLoan(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(successResponse(mockLoan, "Loan application approved"));
        });

        it("should return 404 if loan is not found", async () => {
            (loanService.approveLoan as jest.Mock).mockResolvedValue(null);

            mockReq.params = { id: "1" };
            await loanController.approveLoan(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith(errorResponse("Loan application not found"));
        });
    });
});
