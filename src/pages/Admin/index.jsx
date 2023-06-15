import { Button, TextField } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import { useAuth } from "../../hooks/useAuth"
import Loading from "../../components/Loading"
import { useNavigate } from "react-router"
import { useEffect } from "react"

const Admin = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [loading, setLoading] = useState(false);
  const { loginTeacher, authAdmin } = useAuth()
  const navigate = useNavigate()

  function updateLogin(key, e) {
    setLoginData((currentLogin) => ({
      ...currentLogin,
      [key]: e.target.value,
    }))
  }

  async function loginSubmit(event) {
    event.preventDefault()

    setLoading(true);
    const data = await loginTeacher(loginData.username, loginData.password)
    setLoading(false);
    setLoginData({ username: '', password: '' });
  }

  useEffect(() => {
    if (authAdmin) navigate('dashboard')
  }, [authAdmin])

  return (
    !authAdmin && <AdminContainer>
      <div className="content">
        <h1>Login</h1>
        <TextField onChange={e => updateLogin('username', e)} value={loginData.username} color='primary' label="Usuário" variant="outlined" />
        <TextField onChange={e => updateLogin('password', e)} value={loginData.password} color='primary' label="Senha" variant="outlined" />
        <Button onClick={loginSubmit} variant="contained">Fazer login</Button>
      </div>
      {loading && <Loading />}
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

    h1 {
      text-align: center;
      text-transform: uppercase;
    }
  }
`

export default Admin
