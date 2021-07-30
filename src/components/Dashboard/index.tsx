import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

import { Container } from "./styles";

interface HeaderPropos {
  onOpenNewTransactionModal: () => void;
  onConfirmDialogModal: () => void;
}

export function Dashboard({ onOpenNewTransactionModal, onConfirmDialogModal }: HeaderPropos) {
  return (
    <Container>
      <Summary />
      <TransactionsTable 
        onOpenNewTransactionModal={onOpenNewTransactionModal}
        onConfirmDialogModal={onConfirmDialogModal}
      />
    </Container>
  );
}