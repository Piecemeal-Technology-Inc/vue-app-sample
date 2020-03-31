import axios from 'axios';
import store from './store';
import mock from '../mocks/$mock.js'

let axiosObj = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

if (process.env.VUE_APP_MOCK_MODE === 'true') mock(axiosObj).setDelayTime(500);

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