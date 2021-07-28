import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

import { Container } from "./styles";

interface HeaderPropos {
  onOpenNewTransactionModal: () => void;
  onConfirmDialogModal: () => void;
  onCancelDialogModal: () => void;
}

export function Dashboard({ onOpenNewTransactionModal, onConfirmDialogModal, onCancelDialogModal }: HeaderPropos) {
  return (
    <Container>
      <Summary />
      <TransactionsTable 
        onOpenNewTransactionModal={onOpenNewTransactionModal}
        onConfirmDialogModal={onConfirmDialogModal}
        onCancelDialogModal={onCancelDialogModal}
      />
    </Container>
  );
}