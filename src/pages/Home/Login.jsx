import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import useApi from "../../hooks/useApi"
import { useAuth } from "../../contexts/useAuth"

const Login = () => {
    const [loginDatas, setLoginDatas] = useState({ username: '', teacher: '' })
    const [teachers, setTeachers] = useState([])
    const { getTeachers } = useApi()
    const { loginStudent } = useAuth()

    const fetchTeachers = async () => {
        const teachers = await getTeachers()
        const filteredTeachers = teachers.map(teacher => ({
            name: teacher.name,
            username: teacher.username
        }))

        setTeachers(filteredTeachers)
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    async function loginSubmit(event) {
        event.preventDefault()

        const data = await loginStudent(loginDatas.username, loginDatas.teacher)

        setLoginDatas({ username: '', teacher: '' })
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
                    {teachers.map(teacher => <MenuItem key={teacher.username} value={teacher.username}>{`${teacher.name} (${teacher.username})`}</MenuItem>)}
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