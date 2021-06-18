import { postTransactions } from './postTransactions';
import { badRequest, accepted } from '../utils/httpResponses';

jest.mock('../utils/httpResponses');

test('bad Request', async () => {
    const req = {
      body: [
        {}, //invalid
      ],
    };
    const res = 'res';
    postTransactions(req, res);
  
    expect(badRequest).toHaveBeenCalledWith(res, 'Invalid transactions present');
  });
  
  test('good request', async () => {
    const req = {
      body: [
        {external_id: 13, amount: 13, description:'test'},
        {external_id: 13, amount: 13, description:'test'},
      ],
    };
    const res = 'res';
    postTransaction(req, res);
  
    expect(badRequest).not.toHaveBeenCalled();
    expect(accepted).toHaveBeenCalledWith(res);
    expect(saveTransaction).toHaveBeenCalledTimes(2);
  })