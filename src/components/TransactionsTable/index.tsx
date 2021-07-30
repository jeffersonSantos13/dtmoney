import { FaPen, FaTrash } from "react-icons/fa";

import { useTransactions } from "../../hooks/useTransactions";
import { Container, ButtonAction } from "./styles";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface HeaderPropos {
  onOpenNewTransactionModal: () => void;
  onConfirmDialogModal: () => void;
}

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

export function TransactionsTable({ 
  onOpenNewTransactionModal, 
  onConfirmDialogModal
}: HeaderPropos) {
  const { transactions, setTransactionInformation } = useTransactions();

  function handleUpdateTransaction(input: Transaction) {
    setTransactionInformation(input);
    onOpenNewTransactionModal();
  }

  async function handleDeleteTransaction(input: Transaction) {
    setTransactionInformation(input);

    onConfirmDialogModal();
  }
  
  return (
    <>
      <ToastContainer />
      <Container>
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
              <th>Ação</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(transaction => (  
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  { transaction.type === 'withdraw' ? '-' : '' }
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(new Date())}
                </td>
                <ButtonAction>
                  <FaPen size={20} color="#41414d" onClick={() => handleUpdateTransaction(transaction)} />
                  <FaTrash 
                    size={20} 
                    color="#E02041"
                    onClick={() => handleDeleteTransaction(transaction)}
                  />
                </ButtonAction>
              </tr>
            ))}
          </tbody>
        </table>      
      </Container>
    </>
  );
}
