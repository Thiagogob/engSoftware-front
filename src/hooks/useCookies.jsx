import Cookies from 'universal-cookie'

export const useCookies = () => {
  const cookies = new Cookies()
  const getCookie = (cookie) => cookies.get(cookie)

  const setAuthCookie = (token, expire, cookieName) => {
    if (!expire) return cookies.set(cookieName, `${token}`)

    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    cookies.set(cookieName, `${token}`, { expires: expirationDate })
  }

  const setUserCookie = (user, expire) => {
    if (!expire) return cookies.set('User', user)

    const expirationDate = new Date()
    expirationDate.setFullYear(expirationDate.getFullYear() + 1)
    cookies.set('User', user, { expires: expirationDate })
  }

  const removeCookie = (cookie) => {
    cookies.remove(cookie)
  }

  return { setAuthCookie, getCookie, setUserCookie, removeCookie }
}