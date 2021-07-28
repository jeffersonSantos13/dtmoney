import logoImg from '../../assets/logo.svg';

import { Container, Content, Title } from './styles';

interface HeaderPropos {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderPropos) {
  return(
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
        <Title>By: Jefferson Yuiti dos Santos</Title>
      </Content>
    </Container>
  )
}