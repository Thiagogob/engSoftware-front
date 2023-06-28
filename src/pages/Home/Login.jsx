import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import StyledLink from "../../components/StyledLink";

const Login = () => {
  const [loginDatas, setLoginDatas] = useState({ username: "", teacher: "" });
  const [teachers, setTeachers] = useState([]);
  const { getTeachers } = useApi();
  const { loginStudent, authUser } = useAuth();
  const navigate = useNavigate();

  const fetchTeachers = async () => {
    const teachers = await getTeachers();
    const filteredTeachers = teachers.map(teacher => ({
      name: teacher.name,
      username: teacher.username
    }));

    setTeachers(filteredTeachers);
  };

  useEffect(() => {
    setTimeout(() => fetchTeachers(), 300);

  }, []);

  useEffect(() => {
    if (authUser) navigate("/levels", { replace: true });
  }, [authUser]);

  async function loginSubmit(event) {
    event.preventDefault();

    await loginStudent(loginDatas.username, loginDatas.teacher);
    if (authUser) navigate("/levels", { replace: true });

    setLoginDatas({ username: "", teacher: "" });
  }

  return (
    <>
      {!authUser && (
        <LoginContainer>
          <div className="content">
            <h1 className="text-5xl">Login (Aluno)</h1>
            <TextField onChange={e => setLoginDatas(currentData => ({ ...currentData, username: e.target.value }))} value={loginDatas.username} color='primary' label="Digite o seu nome" variant="outlined" />
            <InputLabel id="123">Professor</InputLabel>
            <Select
              labelId="123"
              value={loginDatas.teacher}
              onChange={e => setLoginDatas(currentData => ({ ...currentData, teacher: e.target.value }))}
            >
              {teachers.map(teacher => <MenuItem key={teacher.username} value={teacher.username}>{`${teacher.name} (${teacher.username})`}</MenuItem>)}
            </Select>
            <Button onClick={loginSubmit} variant="contained">Fazer login</Button>
          </div>
        </LoginContainer>
      )}
      <div className="absolute top-4 right-4">
        <StyledLink to='/'>Voltar ao início</StyledLink>
      </div>
    </>
  );
};

const LoginContainer = styled.div`
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


export default Login;