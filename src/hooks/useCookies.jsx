import Cookies from 'universal-cookie'

export const useCookies = () => {
  const cookies = new Cookies()
  const getCookie = (cookie) => cookies.get(cookie)

  const setAuthCookie = (token, expire) => {
    if (!expire) cookies.set('Authorization', `${token}`)

    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    cookies.set('Authorization', `${token}`, { expires: expirationDate })
  }

  const setUserCookie = (user, expire) => {
    if (!expire) cookies.set('User', user)

    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    cookies.set('User', user, { expires: expirationDate })
  }

  const removeCookie = (cookie) => {
    cookies.remove(cookie)
  }

  return { setAuthCookie, getCookie, setUserCookie, removeCookie }
}