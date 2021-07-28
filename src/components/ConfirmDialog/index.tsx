import Modal from 'react-modal';
import { FiAlertCircle } from "react-icons/fi";

import { useTransactions } from '../../hooks/useTransactions';

import closeImg from '../../assets/close.svg';

import { Container, Button } from './styles';

interface ConfirmDialogPropos {
  confirmDialog: ConfirmDialogInput;
  onConfirmDialogModal: () => void;
  onCancelDialogModal: () => void;
}

interface ConfirmDialogInput {
  isOpen: boolean;
  title: string;
  subTitle: string;
}

export function ConfirmDialog({ confirmDialog, onConfirmDialogModal, onCancelDialogModal }: ConfirmDialogPropos)  {
  const { 
    transaction, 
    deleteTransaction, 
    setTransactionInformation,
    findAllTransactions
  } = useTransactions();

  async function handleDeleteTransaction() {
    if (transaction.id > 0) {
      await deleteTransaction(transaction.id);
    }

    handleonCancelDialogModal();
    findAllTransactions();
    
    alert("Registro deletado com sucesso!")
    // TODO: Adicionar o Toast
  }

  function handleonCancelDialogModal() {
    setTransactionInformation({
      id: 0,
      title: "",
      amount: 0,
      type: "",
      category: ""
    });

    onCancelDialogModal();
  }

  return (
    <Modal
      isOpen={confirmDialog.isOpen}
      onRequestClose={handleonCancelDialogModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={handleonCancelDialogModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container>
        <FiAlertCircle />

        <h2>Você tem certeza que deseja deletar esse registro?</h2>
        <h5>Você não poderá cancelar essa operação!</h5>
        
        <Button>
          <button 
            type="button" 
            onClick={onCancelDialogModal}
          >
            Não
          </button>
          <button
            type="button" 
            onClick={handleDeleteTransaction}
          >
            Sim
          </button>
        </Button>
      </Container>
    </Modal>
  );
}