import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

import { Container } from "./styles";

interface HeaderPropos {
  onOpenNewTransactionModal: () => void;
}

export function Dashboard({ onOpenNewTransactionModal }: HeaderPropos) {
  return (
    <Container>
      <Summary />
      <TransactionsTable 
        onOpenNewTransactionModal={onOpenNewTransactionModal}
      />
    </Container>
  );
}