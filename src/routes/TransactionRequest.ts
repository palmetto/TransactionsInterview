import { Request } from 'express';

export interface TransactionRequest<TBody> extends Request {
    user: {
        id: string;
    },
    body: TBody,
}