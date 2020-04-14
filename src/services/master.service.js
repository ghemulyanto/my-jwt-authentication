import axios from "axios";

const API_MASTER_URL = "http://localhost:8080/api/data/";

class MasterService {
  getRoles() {
    return axios.get(API_MASTER_URL + "roles");
  }
}

export default new MasterService();
