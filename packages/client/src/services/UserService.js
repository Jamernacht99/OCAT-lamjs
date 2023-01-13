import Axios from '../utils/http.config';

export class UserService {
  // static login(user) {
  //   try {
  //     // Choose the correct method, url, and data to send
  //     // in a request to the express packages/api/src/routes/assessment.js
  //     // NOTE: the http.config file automatically adds /api to the front of your url
  //     return Axios.post(`/assessment/submit`, { user })
  //       .then(response => response.data);
  //   }
  //   catch (err) {
  //     throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
  //   }
  // }
  static createUser(user) {
    try {
      return Axios.post(`/user/submit`, { user })
        .then(
          response => response.data
        );
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

}
