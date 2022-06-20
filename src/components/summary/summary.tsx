import { Container } from "./summary.styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { formatAmount } from "utils/formatCurrency";
import { useTransactions } from "hooks/useTransactions";

export const Summary = () => {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, curr) => {
      if (curr.type === "deposit") {
        acc.deposit += curr.amount;
        acc.total += curr.amount;
      } else {
        acc.withdraw += curr.amount;
        acc.total -= curr.amount;
      }

      return acc;
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatAmount(summary.deposit)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>- {formatAmount(summary.withdraw)}</strong>
      </div>
      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>{formatAmount(summary.total)}</strong>
      </div>
    </Container>
  );
};
