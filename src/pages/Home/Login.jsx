import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"

const Login = () => {
    const [loginDatas, setLoginDatas] = useState({ username: '', teacher: '' })

    async function loginSubmit(event) {
        event.preventDefault()

        // const data = await login(loginData)

        setLoginDatas('')
    }

    return (
        <LoginContainer>
            <div className="content">
                <h1>Login</h1>
                <TextField onChange={e => setLoginDatas(currentData => ({ ...currentData, username: e.target.value }))} value={loginDatas.username} color='primary' label="Digite o seu nome" variant="outlined" />
                <InputLabel id="123">Professor</InputLabel>
                <Select
                    labelId="123"
                    value={loginDatas.teacher}
                    onChange={e => setLoginDatas(currentData => ({ ...currentData, teacher: e.target.value }))}
                >
                    <MenuItem value={'Professor 1'}>Professor 1</MenuItem>
                    <MenuItem value={'Professor 2'}>Professor 2</MenuItem>
                    <MenuItem value={'Professor 3'}>Professor 3</MenuItem>
                </Select>
                <Button onClick={loginSubmit} variant="contained">Fazer login</Button>
            </div>
        </LoginContainer>
    )
}

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
`

export default Login