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
    const snapshot = await getDocuments(COLLECTION);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as Loan;
    });
};

/**
 * Create a new loan application.
 * @param {Partial<Loan>} loan - The loan data to be created.
 * @returns {Promise<Loan>}
 */
export const createLoan = async (loan: Partial<Loan>): Promise<Loan> => {
    const id = await createDocument(COLLECTION, loan);
    return { id, ...loan } as Loan;
};

/**
 * Review a loan application by updating its status.
 * @param {string} id - The ID of the loan application.
 * @returns {Promise<Loan | null>}
 */
export const reviewLoan = async (id: string): Promise<Loan | null> => {
    const loan = await getDocumentById(COLLECTION, id);

    if (!loan) {
        return null;
    }

    const updatedLoan = { ...loan.data(), status: "reviewed" };
    await updateDocument(COLLECTION, id, updatedLoan);
    return { id, ...updatedLoan } as Loan;
};

/**
 * Approve a loan application by updating its status.
 * @param {string} id - The ID of the loan application.
 * @returns {Promise<Loan | null>}
 */
export const approveLoan = async (id: string): Promise<Loan | null> => {
    const loan = await getDocumentById(COLLECTION, id);

    if (!loan) {
        return null;
    }

    const updatedLoan = { ...loan.data(), status: "approved" };
    await updateDocument(COLLECTION, id, updatedLoan);
    return { id, ...updatedLoan } as Loan;
};
