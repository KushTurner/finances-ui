import api from './axios';

interface Transaction {
  date: string;
  description: string;
  out: string;
  in: string;
}

const getTransactions = async (): Promise<Transaction[]> => {
  return api
    .get<Transaction[]>('/transactions')
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

export default getTransactions;
