const tokenKey = "_admin_token";

const AuthUtil = {
    isLogin: () => {
        return !!sessionStorage.getItem(tokenKey)
    },
    getToken: () => {
        return sessionStorage.getItem(tokenKey);
    },
    setToken: (token: string, expiresIn?: number) => {
        sessionStorage.setItem(tokenKey, token);
    },
    clearToken: () => {
        sessionStorage.removeItem(tokenKey);
    }

}

export default AuthUtil;