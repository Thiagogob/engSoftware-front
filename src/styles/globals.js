import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
  }

  button, a {
    font-weight: 700;
    text-transform: uppercase;
  }

  a {
    color: red;
  }
`;
