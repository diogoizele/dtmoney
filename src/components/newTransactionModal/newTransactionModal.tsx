import { FormEvent, useState } from "react";
import Modal from "react-modal";

import { useTransactions } from "hooks/useTransactions";
import {
  Container,
  RadioBox,
  TransactionTypeContainer,
} from "./newTransactionModal.styles";
import closeImg from "assets/close.svg";
import incomeImg from "assets/income.svg";
import outcomeImg from "assets/outcome.svg";

import type { NewTransactionModalProps } from "./newTransactionModal.types";

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  const handleCreateNewTransaction = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        className="react-modal-close"
        type="button"
        onClick={onRequestClose}
      >
        <img src={closeImg} alt="fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          placeholder="valor"
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            onClick={() => setType("deposit")}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Endrada</span>
          </RadioBox>
          <RadioBox
            activeColor="red"
            type="button"
            isActive={type === "withdraw"}
            onClick={() => setType("withdraw")}
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
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
