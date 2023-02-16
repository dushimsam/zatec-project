import { Services } from "./services";
import { HttpCommon as http } from "./http";

class AlubmService extends Services {
  
  get_all() {
    return http.get(`/${this.albumPath}`);
  }

  get_all_paginated(page = 1) {
    return http.get(`/${this.albumPath}/paginated?page=${page}`);
  }

  get_songs_by_id_paginated(album, page = 1){
    return http.get(`/${this.albumPath}/${album}/songs?page=${page}`);
  }
  
  get_by_id(album) {
    return http.get(`/${this.albumPath}/${album}`);
  }
  

  get(album) {
    return http.get(`/${this.albumPath}/${album}`);
  }

  update(album, data) {
    return http.put(`/${this.albumPath}/${album}`, data);
  }
  create(data) {
    return http.post(`/${this.albumPath}`, data);
  }

  uploadPicture(album,imgUrl) {
    return http.put(`/${this.albumPath}/${album}/upload`, {'cover_image_url': imgUrl});
  }

  delete(album) {
    return http.delete(`/${this.albumPath}/${album}`);
  }

  get_songs(genre) {
    return http.get(`/${this.albumPath}/${genre}/songs`);
  }
}

export default new AlubmService();
