import { FormEvent, useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalPropos {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalPropos) {
  const { 
    createTransaction, 
    updateTransaction, 
    transaction, 
    setTransactionInformation 
  } = useTransactions();

  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('deposit');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [transactionUpdate, setTransactionUpdate] = useState(false);

  useEffect(() => {
    if (transaction && transaction.id > 0) {
      setId(transaction.id);
      setTitle(transaction.title);
      setAmount(transaction.amount);
      setCategory(transaction.category);
      setType(transaction.type);
      setTransactionUpdate(true);
    }
  }, [transaction]);

  async function handleSubmitTransaction(event: FormEvent) {
    event.preventDefault();

    transactionUpdate ? await handleUpdateTransaction() : await handleCreateNewTransaction();

    handleOnRequestCloseModal();
  }

  function handleOnRequestCloseModal() {
    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    setTransactionUpdate(false);

    setTransactionInformation({
      id: 0,
      title: "",
      amount: 0,
      type: "",
      category: ""
    });

    onRequestClose()
  } 

  async function handleCreateNewTransaction() {
    await createTransaction({
      title,
      amount,
      category,
      type: type.toUpperCase()
    });
  }

  async function handleUpdateTransaction() {
    await updateTransaction({
      id,
      title,
      amount,
      category,
      type: type.toUpperCase()
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleOnRequestCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    > 
      <button 
        type="button" 
        onClick={handleOnRequestCloseModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleSubmitTransaction}>
        <h2>{transactionUpdate ? "Atualizar" : "Cadastrar"} transação</h2>

        <input type="text" 
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input 
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">
          {transactionUpdate ? "Atualizar" : "Cadastrar"}
        </button>
      </Container>
    </Modal>
  );
}