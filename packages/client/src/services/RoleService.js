import Axios from '../utils/http.config';

export class RoleService {
  static getList() {
    try {
      return Axios.get(`/role/list`, {
        params: {
        },
      })
        .then(
          response => response.data.data
        );
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
