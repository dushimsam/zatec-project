import {Services} from "./services";
import {HttpCommon as http} from "./http";

class UsersService extends Services {
   
    get_all() {
        return http.get(`${this.userPath}`);
    }

    get_by_id(user) {
        return http.get(`/${this.userPath}/${user}`);
    }
}

export default new UsersService();
