import express from 'express'
import { transactionRouter } from './routes/transactionsRouter';

const app = express();
const port = 3000;

app.use('/transactions', transactionRouter());

app.listen(port, () => {
  console.log(`API running on PORT ${port}`)
});