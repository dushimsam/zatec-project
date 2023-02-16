import AuthService from "../services/auth.service";
import {KEYS} from "../utils/constants";
import jwt from "jwt-decode";

class Auth {

    LOCAL_STORAGE_TOKEN_KEY = KEYS.LOCAL_STORAGE_TOKEN_KEY;

    async isAuthed() {
        const token = sessionStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
        if (!token) return false;
        let profile = await AuthService.profile();
        return profile.data._id;
    }

    isLoggedIn() {
        const token = this.getDecToken();
        if (!!token) {
            try {
                return jwt(token);
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    }

    isActive() {
        return !!(this.isLoggedIn() && !this.tokenExpired());
    }

    setToken(token) {
        localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, token);
    }

    getExp() {
        const token = this.isLoggedIn();
        if (!token) return null;

        const date = new Date(0);
        date.setUTCSeconds(token.exp);

        return date;
    }


    logout() {
        this.removeToken();
    }


    getEncToken() {
        if (typeof window !== "undefined") return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
        return;
    }

    getDecToken() {
        if (typeof window !== "undefined") return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
        return;
    }


    removeToken() {
        localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY)
    }


    tokenExpired() {
        const exp = this.getExp();
        if (!exp) return null;
        const expired = !(exp.valueOf() > new Date().valueOf());
        if (expired) this.logout();
        return expired;
    }

}

export default new Auth();