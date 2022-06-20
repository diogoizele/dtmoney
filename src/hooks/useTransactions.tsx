import { Transaction } from "components/transactionsTable/transactionsTable.types";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "services/api";

type TransactionsProviderProps = {
  children: React.ReactNode;
};

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type TransactionContextSchema = {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

const TransactionsContext = createContext<TransactionContextSchema>(
  {} as TransactionContextSchema
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  const createTransaction = async (enteredTransaction: TransactionInput) => {
    const { data } = await api.post("/transactions", enteredTransaction);
    const { transaction } = data;

    setTransactions((transactions) => [...transactions, transaction]);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions deve estar dentro de um TransactionsProvider"
    );
  }

  return context;
};
