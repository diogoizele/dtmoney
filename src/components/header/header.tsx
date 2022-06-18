import logoImg from "assets/logo.svg";
import { Dashboard } from "components/dashboard/dashboard";
import { Container, Content } from "./header.styles";

export const Header = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button">Nova transação</button>
      </Content>
      <Dashboard />
    </Container>
  );
};
