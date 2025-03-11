export interface Loan {
    id?: string;
    borrowerId: string;
    amount: number;
    interestRate: number;
    termMonths: number;
    status: "pending" | "approved" | "rejected";
    createdAt?: Date;
    updatedAt?: Date;
}
