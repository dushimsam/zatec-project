import {KEYS} from "../utils/constants";

class RouteService {

    getPrevRoute() {
        if (typeof window !== "undefined")
            if (localStorage.getItem(KEYS.LOCAL_STORAGE_TOKEN_KEY))
                return localStorage.getItem(KEYS.PREV_LINK_LOCAL_STORAGE_KEY);
            else
                return null;
    }

    removePrevRoute() {
        localStorage.removeItem(KEYS.PREV_LINK_LOCAL_STORAGE_KEY)
    }
}

export default new RouteService();
