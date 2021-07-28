import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

import { 
  GRAPHQL_API, 
  LIST_ALL_TRANSACTIONS, 
  MUTATION_CREATE_TRANSACTION,
  MUTATION_UPDATE_TRANSACTION,
  MUTATION_DELETE_TRANSACTION
} from '../constants/graphql';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface PageInfo {
  page: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

type TransactionInputUpdate = Omit<Transaction, 'createdAt'>;

//type TransactionInput = Pick<Transaction, 'amount' | 'title' | 'type' | 'category'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  transaction: TransactionInputUpdate;
  pageInfo: PageInfo;
  createTransaction: (Transaction: TransactionInput) => Promise<void>;
  updateTransaction: (Transaction: TransactionInputUpdate) => Promise<void>;
  deleteTransaction: (id: Number) => Promise<void>;
  findAllTransactions: () => void;
  setTransactionInformation: (Transaction: TransactionInputUpdate) => void;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transaction, setTransaction] = useState<TransactionInputUpdate>({} as TransactionInputUpdate);
  const [pageInfo, setPageInfo] = useState<PageInfo>({} as PageInfo);

  useEffect(() => {
    axios.post(GRAPHQL_API,{
      query: LIST_ALL_TRANSACTIONS,
      variables: { 
        page: 0 
      }
    })
    .then(response => { 
      setTransactions(response.data.data.listAllTransactions.transactionResponse);
      setPageInfo(response.data.data.listAllTransactions.pageInfo);
    });
  }, []);

  async function findAllTransactions() {
    axios.post(GRAPHQL_API,{
      query: LIST_ALL_TRANSACTIONS,
      variables: { 
        page: 0 
      }
    })
    .then(response => { 
      setTransactions(response.data.data.listAllTransactions.transactionResponse);
      setPageInfo(response.data.data.listAllTransactions.pageInfo);
    });
  }
  
  async function createTransaction(input: TransactionInput) {
    const response = await axios.post(GRAPHQL_API, {
      query: MUTATION_CREATE_TRANSACTION,
      variables: {
        input
      },
    });

    setTransactions([
      ...transactions,
      response.data.data.createTransaction
    ]);
  }

  async function updateTransaction(input: TransactionInputUpdate) {
    const response = await axios.post(GRAPHQL_API, {
      query: MUTATION_UPDATE_TRANSACTION,
      variables: {
        input
      },
    });

    if (response.data) {
      const updateTransactionInput = response.data.data.updateTransaction;
      
      const transactionsIndex = transactions.findIndex(
        transactionItem => transactionItem.id === updateTransactionInput.id);

      transactions[transactionsIndex] = updateTransactionInput;

      setTransactions([...transactions]);
    }
  }

  async function deleteTransaction(id: Number) {
    try {
      await axios.post(GRAPHQL_API, {
        query: MUTATION_DELETE_TRANSACTION,
        variables: {
          id
        },
      });

      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch(err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function setTransactionInformation(input: TransactionInputUpdate) {
    setTransaction(input);
  }

  // Paginação

  return (
    <TransactionsContext.Provider value={
      { 
        transactions, 
        transaction, 
        pageInfo, 
        createTransaction,
        updateTransaction,
        deleteTransaction,
        setTransactionInformation,
        findAllTransactions
      }
    }>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}