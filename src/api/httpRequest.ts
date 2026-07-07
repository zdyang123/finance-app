import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig
} from "axios";
/**
 * 额外配置
 */
interface ExtraConfig {
  /** 请求头type */
  contentType?: string;
  mode?: ImportMetaEnv;
}

type R = AxiosRequestConfig & ExtraConfig;

const requestConfig: R = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 60000,
  mode: import.meta.env,
  // 跨域时候允许携带凭证
  // withCredentials: true
};

interface requestParams {
  baseURL?: string;
  url: string;
  params?: object;
  data?: object;
  reqConfig?: R;
}

class Http {
  private readonly service: AxiosInstance;
  constructor() {
    this.service = axios.create(requestConfig);
    this.interceptors();
  }

  /**
   * 拦截器
   * @private
   */
  private interceptors() {
    /**
     * 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig & ExtraConfig) => {
        const token = "your_token_here";

        if (token && config.headers) {
          config.headers.set("authorization", `Bearer ${token}`);
          config.headers.set("content-type", "application/json");
        }

        return config;
      },
      (error: AxiosError) => {
        // 请求报错
        return Promise.reject(error);
      },
    );

    /**
     * 响应拦截器
     */
    this.service.interceptors.response.use(
      (res: AxiosResponse) => {
        return res;
      },
      (error: AxiosError) => {
        const { response }: any = error;
        console.log("error", response);
        if (!window.navigator.onLine) {
          console.error("网络连接失败");
        }
        throw error;
      },
    );
  }

  /**
   * 检查字符串是否包含需要URL编码的特殊字符
   * @param str 需要检查的字符串
   * @returns boolean
   */
  private hasSpecialChars(str: string): boolean {
    const specialChars = /[!@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/;
    return specialChars.test(str);
  }

  public getAction<T>(options: requestParams): Promise<T> {
    let { baseURL, url, params, reqConfig } = options;
    return new Promise<T>((resolve, reject) => {
      this.service({
        baseURL,
        url,
        method: "GET",
        params,
        ...reqConfig,
      })
        .then((res) => {
          res && resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  }

  public deleteAction<T>(options: requestParams): Promise<T> {
    let { baseURL, url, data, reqConfig } = options;
    return new Promise<T>((resolve, reject) => {
      this.service({
        baseURL,
        url,
        method: "DELETE",
        data,
        ...reqConfig,
      })
        .then((res) => {
          res && resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public postAction<T>(options: requestParams): Promise<T> {
    let { baseURL, url, data, reqConfig } = options;
    return new Promise<T>((resolve, reject) => {
      this.service({
        baseURL,
        url,
        method: "POST",
        data,
        ...reqConfig,
      })
        .then((res) => {
          res && resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  }

  public putAction<T>(options: requestParams): Promise<T> {
    let { baseURL, url, data, reqConfig } = options;
    return new Promise<T>((resolve, reject) => {
      this.service({
        baseURL,
        url,
        method: "PUT",
        data,
        ...reqConfig,
      })
        .then((res) => {
          res && resolve(res.data);
        })
        .catch((err) => {
          reject(err.response);
        });
    });
  }
}

const request = new Http();
export default request;
