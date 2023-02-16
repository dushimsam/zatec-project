import {Services} from "./services";
import {HttpCommon} from "./http";

class AuthService extends Services {
    login(user) {
        return HttpCommon.post("/auth/login", user);
    }

    register(user) {
        return HttpCommon.post("/auth/register", user);
    }

    changePassword(body) {
        return HttpCommon.put("/auth/change-password", body);
    }

    profile() {
        return HttpCommon.get("/auth/self");
    }

}

export default new AuthService();
