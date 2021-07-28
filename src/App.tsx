import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from './components/NewTransactionModal';
import { ConfirmDialog } from './components/ConfirmDialog';

import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  function handleCancelDialogModal() {
    setConfirmDialog({ ...confirmDialog, isOpen: false});
  }

  function handleConfirmDialogModal() {
    setConfirmDialog({ ...confirmDialog, isOpen: true});
  }
  
  return (
    <TransactionsProvider>
      <Header 
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />

      <Dashboard 
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
        onConfirmDialogModal={handleConfirmDialogModal}
        onCancelDialogModal={handleCancelDialogModal}
      />

      <NewTransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <ConfirmDialog 
        confirmDialog={confirmDialog}
        onConfirmDialogModal={handleConfirmDialogModal}
        onCancelDialogModal={handleCancelDialogModal}
      />

      <GlobalStyle />
    </TransactionsProvider>
  );
}
