import { useTransactions } from "hooks/useTransactions";
import { formatAmount } from "utils/formatCurrency";
import { Container } from "./transactionsTable.styles";

export const TransactionsTable = () => {
  const { transactions } = useTransactions();

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
  };

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(
            ({ id, title, amount, category, createdAt, type }) => (
              <tr key={id}>
                <td>{title}</td>
                <td className={type}>{formatAmount(amount)}</td>
                <td>{category}</td>
                <td>{formatDate(createdAt)}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
};
