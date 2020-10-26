import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse} from 'axios'
import {log_err, log_info, notifyRequestFail} from "../utils/common";
import AuthUtil from "../utils/auth";
import {getProperty} from "../utils/properties";

export interface HttpResponse<T = any> {
    code: string;
    msg?: string;
    data?: T;
}

export interface Axios extends AxiosInstance {
    (config: AxiosRequestConfig): Promise<HttpResponse>;
}

const request = <Axios>axios.create({
  baseURL: getProperty('baseUrl'),
  timeout: 10000,
})

request.interceptors.request.use(
  config => {
    log_info('request config', config)
    if(!config.headers['Content-Type'])
      config.headers['Content-Type'] = 'application/json';
    const token = AuthUtil.getToken();
    if(token)
      config.headers['Authorization'] = 'Bearer ' + token;
    return config;
  }, err => {
    notifyRequestFail("请求超时，请稍后重试！");
    log_err('request fail:', err.request, 'err:', err);
    return Promise.reject(err);
  }
)

request.interceptors.response.use(
  response => {
    if(response.status === 200) {
      return response.data;
    } else {
      notifyRequestFail(JSON.stringify(response));
      log_err('response fail with status:', response.status, response, 'request:', response.request);
      return Promise.reject(response);
    }

  },
  err => {
    if(err.response && err.response.status === 401) {
        notifyRequestFail('登录已失效，请重新登录！');
        AuthUtil.clearToken();
        window.location.reload();
    } else {
        notifyRequestFail("请求超时，请稍后重试！");
        log_err('response error', err.response, err, 'request:', err.request);
        return Promise.reject(err);
    }
  }
)

export default request;
