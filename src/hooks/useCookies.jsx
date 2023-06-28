import Cookies from "universal-cookie";

export const useCookies = () => {
  const cookies = new Cookies();
  const getCookie = async (cookie) => await cookies.get(cookie);

  const setAuthCookie = (token, cookieName) => {
    // Criar um cookie com duracao de uma sessao
    cookies.set(cookieName, token);
  };

  const setUserCookie = (user) => {
    cookies.set("user", user);
  };

  const removeCookie = (cookie) => {
    cookies.remove(cookie, { path: "/" });
  };

  return { setUserCookie, setAuthCookie, getCookie, removeCookie };
};
