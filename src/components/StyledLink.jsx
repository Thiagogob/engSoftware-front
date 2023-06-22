import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  background-color: #111111;
  color: #FBFBFB;
  padding: 1rem 1.75rem;
  letter-spacing: .25rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.75rem;
  transition: ease-in-out 200ms;

  &:hover {
    text-decoration: none;
    background-color: #333;
    color: #FBFBFB;
  }
`;

export default StyledLink;
