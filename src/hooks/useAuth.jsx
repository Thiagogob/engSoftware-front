import { useContext, useEffect } from 'react'
import { useCookies } from './useCookies'
import { AuthContext } from '../contexts/auth'

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const { getCookie, removeCookie, setAuthCookie, setUserCookie } = useCookies()

  useEffect(() => {
    const validationCookies = async () => {
      const studentCookie = await getCookie('authstudent')
      const teacherCookie = await getCookie('authsteacher')

      const authValue = teacherCookie
        ? { admin: true, user: false }
        : studentCookie
          ? { admin: false, user: true }
          : { admin: false, user: false };

      setAuth(authValue)
    }
    validationCookies()
  }, [])

  useEffect(() => console.log(auth), [auth])

  const getUser = () => {
    const result = getCookie('User')
    const user = result
    return { ...user }
  }

  const loginTeacher = async (username, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }

    const response = await fetch('https://apifaunasnapshot.vercel.app/auth/teacher', requestOptions)
    const data = await response.json()

    if (data?.token) {
      setAuthCookie(data.token, true, 'authteacher')
      setAuth({ admin: true, user: false })

      if (await getCookie('authstudent')) removeCookie('authstudent')
    }

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

    if (data?.token) {
      setAuthCookie(data.token, true, 'authteacher')
      setAuth({ admin: true, user: false })

      if (await getCookie('authstudent')) removeCookie('authstudent')
    }

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

    if (loginData?.token) {
      setAuthCookie(loginData.token, true, 'authstudent')
      setUserCookie({ username, teacherUser }, true)

      setAuth({ admin: false, user: true })

      if (await getCookie('authteacher')) removeCookie('authteacher')
    }

    return loginData
  }

  return {
    authAdmin: auth?.admin,
    authUser: auth?.user,
    getUser,
    loginTeacher,
    registerTeacher,
    loginStudent
  }
}