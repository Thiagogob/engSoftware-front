import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"

const Admin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })

  function updateLogin(key, e) {
    setLoginData((currentLogin) => ({
      ...currentLogin,
      [key]: e.target.value,
    }))
  }

  async function loginSubmit(event) {
    event.preventDefault()

    // const data = await login(loginData)

    setLoginData({ username: '', password: '' })
  }

  return (
    <AdminContainer>
      <div className="content">
        <TextField onChange={e => updateLogin('username', e)} value={loginData.username} color='primary' label="Usuário" variant="outlined" />
        <TextField onChange={e => updateLogin('password', e)} value={loginData.password} color='primary' label="Senha" variant="outlined" />
        <Button onClick={loginSubmit} variant="contained">Fazer login</Button>
      </div>
    </AdminContainer>
  )
}

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
  }
`

export default Admin
