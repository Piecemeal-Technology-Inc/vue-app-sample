import axios from 'axios';
import store from './store';

let axiosObj = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

axiosObj.interceptors.request.use(request => {
  store.state.loadingDialog.open();
  return request
})

axiosObj.interceptors.response.use(
  (response) => {
    store.state.loadingDialog.close();
    return response;
  },
  (error) => {
    store.state.loadingDialog.close();
    store.state.messageDialog.openError('M00001', [(error.response) ? error.response.status: 'none']);

    return Promise.reject(error);
  }
);

export default axiosObj;