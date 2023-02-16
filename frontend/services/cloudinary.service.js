import axios from "axios";
import {Services} from "./services";

export const domain = "https://api.cloudinary.com/v1_1/dushsam";
const CLOUDINARY_UPLOAD_PRESET = "flhyd7jb";

const http = axios.create({
    baseURL: domain, headers: {'Content-Type': 'application/json'},
});


class CloudinaryService extends Services {
    formData = new FormData();

    constructor(file) {
        super();
        this.formData.append("file", file);
        this.formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    }

    upload(){
        return http.post("/image/upload",this.formData)
    }
}

export default CloudinaryService;
