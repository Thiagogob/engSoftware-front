import { useCookies } from 'hooks/useCookies'
import { createContext, useContext, useState } from 'react'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(true)

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const { getCookie, removeCookie } = useCookies()

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

  return {
    auth,
    setCookieAuth,
    getUser,
    removeAuth,
  }
}