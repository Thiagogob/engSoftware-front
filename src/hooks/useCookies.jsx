import Cookies from "universal-cookie";

export const useCookies = () => {
  const cookies = new Cookies();
  const getCookie = async (cookie) => await cookies.get(cookie);

  const setAuthCookie = (token, cookieName) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    cookies.set(cookieName, `${token}`, { expires: expirationDate });
  };

  const setUserCookie = (user) => {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    cookies.set("user", user, { expires: expirationDate });
  };

  const removeCookie = (cookie) => {
    cookies.remove(cookie, { path: "/" });
  };

  return { setUserCookie, setAuthCookie, getCookie, removeCookie };
};
