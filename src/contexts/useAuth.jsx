import { useCookies } from '../hooks/useCookies'
import { createContext, useContext, useState } from 'react'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true)

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const { getCookie, removeCookie, setAuthCookie } = useCookies()

  const setCookieAuth = () => {
    const result = getCookie('Authorization')
    setAuth(result === undefined ? false : true)
  }

  const getUser = () => {
    const result = getCookie('User')
    const user = result
    return { ...user }
  }

  const removeAuth = () => {
    removeCookie('Authorization')
    removeCookie('User')
    setAuth(false)
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

    return data
  }

  return {
    auth,
    setCookieAuth,
    getUser,
    removeAuth,
    loginTeacher,
    registerTeacher
  }
}