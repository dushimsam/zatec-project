import { Services } from "./services";
import { HttpCommon as http } from "./http";

class GenreService extends Services {

    get_all(){
        return http.get(`/${this.genrePath}`);
    }

    get_all_paginated(page = 1) {
        return http.get(`/${this.genrePath}/paginated?page=${page}`);
    }

    get_songs_by_id_paginated(genre, page = 1){
        return http.get(`/${this.genrePath}/${genre}/songs?page=${page}`);
      }

    get_by_id(genre){
        return http.get(`/${this.genrePath}/${genre}`);
    }

    create(data) {
        return http.post(`/${this.genrePath}`,data);
    }

    update(genre,data) {
        return http.put(`/${this.genrePath}/${genre}`,data);
    }

    delete(genre) {
        return http.delete(`/${this.genrePath}/${genre}`);
    }

    get_songs(genre){
        return http.get(`/${this.genrePath}/${genre}/songs`);
    }
}

export default new GenreService();
