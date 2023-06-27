import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import StyledLink from "../../components/StyledLink";

const AdminRegister = () => {
  const [loginData, setLoginData] = useState({ username: "", name: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { registerTeacher, authAdmin } = useAuth();
  const navigate = useNavigate();

  function updateLogin(key, e) {
    setLoginData((currentLogin) => ({
      ...currentLogin,
      [key]: e.target.value,
    }));
  }

  async function loginSubmit(event) {
    event.preventDefault();

    setLoading(true);
    await registerTeacher(loginData.name, loginData.username, loginData.password);
    setLoading(false);

    setLoginData({ username: "", password: "", name: "" });
  }

  useEffect(() => {
    if (authAdmin) navigate("dashboard");
  }, [authAdmin]);

  return (
    <>
      <AdminContainer>
        <div className="content">
          <h1 className="text-4xl">Cadastro (Professor)</h1>
          <TextField onChange={e => updateLogin("name", e)} value={loginData.name} color='primary' label="Nome" variant="outlined" />
          <TextField onChange={e => updateLogin("username", e)} value={loginData.username} color='primary' label="Usuário" variant="outlined" />
          <TextField onChange={e => updateLogin("password", e)} value={loginData.password} color='primary' label="Senha" variant="outlined" />
          <Link to='/admin'>Já possui uma conta?</Link>
          <Button onClick={loginSubmit} variant="contained">Fazer cadastro</Button>
        </div>
        {loading && <Loading />}
      </AdminContainer>
      <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <StyledLink to='/'>Voltar ao início</StyledLink>
      </div>
    </>
  );
};

const AdminContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(200, 200, 200, 1);
    width: 40%;
    padding: 2rem;
    border-radius: .5rem;

    h1 {
      text-align: center;
      text-transform: uppercase;
    }
  }
`;

export default AdminRegister;
