import { Loan } from "../interface/loanInterface";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
} from "../repository/firebaseRepository";

const COLLECTION = "loans";

/**
 * Fetch all loan applications.
 * @returns {Promise<Loan[]>}
 */
export const fetchAllLoans = async (): Promise<Loan[]> => {
    try {
        console.log("Fetching all loans...");
        const snapshot = await getDocuments(COLLECTION);

        console.log(`Found ${snapshot.docs.length} loan(s)`);

        return snapshot.docs.map((doc) => {
            const data = doc.data();
            console.log("Loan Data:", data);
            return { id: doc.id, ...data } as Loan;
        });
    } catch (error) {
        console.error("Error fetching loans:", error);
        throw new Error("Failed to fetch loans");
    }
};

/**
 * Create a new loan application.
 * @param {Partial<Loan>} loan - The loan data to be created.
 * @returns {Promise<Loan>}
 */
export const createLoan = async (loan: Partial<Loan>): Promise<Loan> => {
    try {
        console.log("Creating new loan:", loan);

        // Validation check for the required loan properties
        if (!loan.borrowerId || loan.amount === undefined || loan.amount <= 0 || loan.termMonths === undefined || loan.interestRate === undefined) {
            throw new Error("Loan data is incomplete or invalid.");
        }

        const id = await createDocument(COLLECTION, loan);
        return { id, ...loan } as Loan;
    } catch (error) {
        console.error("Error creating loan:", error);
        throw new Error("Failed to create loan. Please try again later.");
    }
};

/**
 * Review a loan application by updating its status.
 * @param {string} id - The ID of the loan application.
 * @returns {Promise<Loan | null>}
 */
export const reviewLoan = async (id: string): Promise<Loan | null> => {
    try {
        console.log(`Reviewing loan with ID: ${id}`);
        const loanDoc = await getDocumentById(COLLECTION, id);

        if (!loanDoc?.exists) {
            console.warn(`Loan with ID ${id} not found`);
            return null;
        }

        const updatedLoan = { ...loanDoc.data(), status: "reviewed" };
        await updateDocument(COLLECTION, id, updatedLoan);
        return { id, ...updatedLoan } as Loan;
    } catch (error) {
        console.error("Error reviewing loan:", error);
        throw new Error("Failed to review loan");
    }
};

/**
 * Approve a loan application by updating its status.
 * @param {string} id - The ID of the loan application.
 * @returns {Promise<Loan | null>}
 */
export const approveLoan = async (id: string): Promise<Loan | null> => {
    try {
        console.log(`Approving loan with ID: ${id}`);
        const loanDoc = await getDocumentById(COLLECTION, id);

        if (!loanDoc?.exists) {
            console.warn(`Loan with ID ${id} not found`);
            return null;
        }

        const updatedLoan = { ...loanDoc.data(), status: "approved" };
        await updateDocument(COLLECTION, id, updatedLoan);
        return { id, ...updatedLoan } as Loan;
    } catch (error) {
        console.error("Error approving loan:", error);
        throw new Error("Failed to approve loan");
    }
};
