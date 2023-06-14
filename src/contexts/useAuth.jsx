import { useCookies } from '../hooks/useCookies'
import { createContext, useContext, useEffect, useState } from 'react'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ admin: false, user: false })

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const { getCookie, removeCookie, setAuthCookie } = useCookies()

  useEffect(() => setAuth(getCookie('authteacher') === undefined ? false : true), [])

  const getUser = () => {
    const result = getCookie('User')
    const user = result
    return { ...user }
  }

  const removeAuth = () => {
    // removeCookie('Authorization')
    // removeCookie('User')
    // setAuth(false)
  }

  const loginTeacher = async (username, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }

    const response = await fetch('https://apifaunasnapshot.vercel.app/auth/teacher', requestOptions)
    const data = await response.json()

    if (data?.token) setAuthCookie(data.token, true, 'authteacher')
    setAuth({ admin: true, user: false })

    return data
  }

  const registerTeacher = async (name, username, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, username, password }),
    }

    const response = await fetch('https://apifaunasnapshot.vercel.app/teacher', requestOptions)
    const data = await response.json()

    if (data?.token) setAuthCookie(data.token, true, 'authteacher')
    setAuth({ admin: true, user: false })

    return data
  }

  const loginStudent = async (username, teacherUser) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, teacherUser }),
    }

    await fetch('https://apifaunasnapshot.vercel.app/student', requestOptions)

    const loginResponse = await fetch('https://apifaunasnapshot.vercel.app/auth/student', requestOptions)
    const loginData = await loginResponse.json()

    if (loginData?.token) setAuthCookie(loginData.token, true, 'authstudent')

    return loginData
  }

  return {
    authAdmin: auth.admin,
    authUser: auth.user,
    getUser,
    removeAuth,
    loginTeacher,
    registerTeacher,
    loginStudent
  }
}