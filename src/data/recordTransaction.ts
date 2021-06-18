import { Transaction } from "./Transaction";

export const recordTransaction = async (transaction: Transaction, userId: string): Promise<void> => {
    console.log('Saved Transaction', JSON.stringify({transaction, userId}, null, '  '));
}