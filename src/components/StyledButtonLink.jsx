import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledButtonLink = styled(Link)`
  color: #FBFBFB;
  padding:.25rem 1rem;
  letter-spacing: .15rem;
  border-radius: .25rem;
  font-weight: 500;
  font-size: 1.4rem;

  &:hover {
    text-decoration: none;
    color: #FBFBFB;
  }
`;

export default StyledButtonLink;
