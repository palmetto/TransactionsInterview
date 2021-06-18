import { Transaction } from "./Transaction";

export const recordTransaction = async (transaction: Transaction): Promise<void> => {
    console.log('Saved Transaction', JSON.stringify(transaction, null, '  '));
}