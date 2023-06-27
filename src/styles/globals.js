import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    background-image: url(/static/images/faunaSnapshotBackground.jpg);
    background-size: cover;
    text-transform: uppercase;
  }

  button, a {
    font-weight: 700;
    text-transform: uppercase;
  }
`;
