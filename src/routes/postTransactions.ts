import { Response } from 'express'
import { badRequest, accepted } from '../utils/httpResponses';
import { Transaction } from '../data/Transaction';
import { hash } from '../utils/hash';
import { recordTransaction } from '../data/recordTransaction';
import { TransactionRequest } from './TransactionRequest';

export interface PostedTransaction {
    externalId: number;
    amount: number;
    description: string;
}

export const postTransactions = async (req: TransactionRequest<PostedTransaction[]>, res: Response): Promise<void> => {
    let good: Transaction[] = [],
    bad: PostedTransaction[] = [];
  validateTransactions(req.body, good, bad);

  if (bad.length > 0) {
    badRequest(res, 'Invalid transactions present');
    return;
  }

  if (good.length > 0) {
    good.forEach(async t => {
      await recordTransaction(t, req.user.id);
    });
    return accepted(res);
  }
};

export const validateTransactions = (transactions: PostedTransaction[], good: Transaction[], bad: PostedTransaction[]): void => {
    for (let i = 0; i < transactions.length; i++) {
      const t = transactions[i];
      if (t.externalId == NaN) {
        t.externalId = parseInt(t.externalId);
        if (t.externalId == NaN) {
          bad.push(t);
          continue;
        }
      }
  
      if (t.amount == 0) {
        bad.push(t);
        continue;
      }
  
      if (!t.description) {
        bad.push(t);
        continue;
      }
  
      (t as Transaction).internalId = hash(t.externalId + '###' + t.amount + '!!!' + t.description);
      good.push((t as Transaction));
    }
  };