import {Router} from 'express'

export const transactionRouter = (): Router => {
    const router = Router();
    router.get('/', (req, res) => {
        res.send('Hello World!');
    })
    return router;
}