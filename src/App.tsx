import { createServer } from "miragejs";

import { Header } from "components/header/header";
import { GlobalStyle } from "styles/global";

createServer({
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "Desenvolvimento de website",
          value: 12000,
          category: "Desenvolvimento",
          date: "23/03/2022",
        },
        {
          id: 2,
          title: "Curso  de ReactJS",
          value: 2000,
          category: "Lazer",
          date: "23/03/2022",
        },
      ];
    });
  },
});

export const App = () => {
  return (
    <>
      <Header />
      <GlobalStyle />
    </>
  );
};
