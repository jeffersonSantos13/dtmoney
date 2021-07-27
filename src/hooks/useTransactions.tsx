import { createContext, useEffect, useState, useContext, ReactNode } from 'react';
import { api } from '../services/api';
import { GRAPHQL_API, LIST_ALL_TRANSACTIONS, MUTATION_CREATE_TRANSACTION } from '../constants/graphql';
import axios from 'axios';

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
  
  async function createTransaction(input: TransactionInput) {
    const response = await api.post('', {
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
    console.log("Input", input);

    console.log("Transaction", transaction);
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
        setTransactionInformation
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