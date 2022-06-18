import { Container } from "./transactionsTable.styles";

export const TransactionsTable = () => {
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
          <tr>
            <td>Desenvolvimento de website</td>
            <td>R$12.000,00</td>
            <td>Desenvolvimento</td>
            <td>23/03/2022</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
