import { Services } from "./services";
import { HttpCommon as http } from "./http";

class SongService extends Services {

    get_all() {
        return http.get(`/${this.songPath}`);
    }

    get_all_paginated(page=1) {
        return http.get(`/${this.songPath}/paginated?page=${page}`);
    }

    create(data) {
        return http.post(`/${this.songPath}`, data);
    }

    get_by_id(song) {
            return http.get(`/${this.songPath}/${song}`);
    }

    update(song, data) {
        return http.put(`/${this.songPath}/${song}`, data);
    }

    delete(song) {
        return http.delete(`/${this.songPath}/${song}`);
    }

}

export default new SongService();
