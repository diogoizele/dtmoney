import { useState } from "react";
import ReactModal from "react-modal";
import { createServer, Model } from "miragejs";

import { GlobalStyle } from "styles/global";
import { Header } from "components/header/header";
import { Dashboard } from "components/dashboard/dashboard";
import { NewTransactionModal } from "components/newTransactionModal/newTransactionModal";
import { TransactionsProvider } from "hooks/useTransactions";

ReactModal.setAppElement("#root");

createServer({
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento de website",
          amount: 12000,
          category: "Desenvolvimento",
          type: "deposit",
          createdAt: new Date("2021-03-23"),
        },
        {
          id: 2,
          title: "Aluguél",
          amount: 1100,
          category: "Casa",
          type: "withdraw",
          createdAt: new Date("2022-12-23"),
        },
      ],
    });
  },
  models: {
    transaction: Model,
  },
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });
    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", { ...data, createdAt: new Date() });
    });
  },
});

export const App = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const handleOpenNewTransactionModal = () => {
    setIsNewTransactionModalOpen(true);
  };

  const handleCloseNewTransactionModal = () => {
    setIsNewTransactionModalOpen(false);
  };

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <Dashboard />
      <GlobalStyle />
    </TransactionsProvider>
  );
};
