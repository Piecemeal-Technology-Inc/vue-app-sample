
import mockData from '@/data/MockData.js'
import store from '@/store';

const AxiosMock = {
  get: function (url, params) {
    AxiosMock.loading();

    return new Promise(function (resolve) {
      resolve(AxiosMock.getData('get', url, params));
    });
  },
  post: function (url, params) {
    AxiosMock.loading();

    return new Promise(function (resolve) {
      resolve(AxiosMock.getData('post', url, params));
    });
  },
  put: function (url, params) {
    AxiosMock.loading();

    return new Promise(function (resolve) {
      resolve(AxiosMock.getData('put', url, params));
    });
  },
  delete: function (url, params) {
    AxiosMock.loading();

    return new Promise(function (resolve) {
      resolve(AxiosMock.getData('delete', url, params));
    });
  },
  getData: function (method, url, params) {
    let urlWithParam = url;

    if (params) {
      if (method === 'get') params = params.params 
      urlWithParam += "?"
      Object.keys(params).forEach((key) => {
        urlWithParam += key + "=" + params[key] + '&';
      });
      urlWithParam = urlWithParam.replace(/&$/, '');
    }

    let data = mockData[method][urlWithParam];

    if (data) return data;

    // 後方の*を取り除いて一致すればそれを返す。
    let keys = Object.keys(mockData[method]);
    keys.forEach(key => {
      if (key.indexOf('*') >= 0) {
        let wildcardUrl = key.replace('*', '');
        if (urlWithParam.indexOf(wildcardUrl) === 0) {
          data = mockData[method][key];
          return false;
        }
      }
    });

    return data ? data : mockData[method][url];
  },

  loading: function () {
    if (store.state.loadingDialog) {
      store.state.loadingDialog.open();
      setTimeout(() => {
        store.state.loadingDialog.close();
      }, 500);
    }
  }
}
export default AxiosMock;