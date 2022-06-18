import { Summary } from "components/summary/summary";
import { TransactionsTable } from "components/transactionsTable/transactionsTable";

import { Container } from "./dashboard.styles";

export const Dashboard = () => {
  return (
    <Container>
      <Summary />
      <TransactionsTable />
    </Container>
  );
};
