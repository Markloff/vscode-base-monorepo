import axios, {AxiosInstance, AxiosRequestConfig} from "axios"
import ENV_CONFIG from "../../build/env.json"
import { ServiceConfigObj, ServiceObj} from "../types/service";

const { BASE_URL: ServiceUrl } = ENV_CONFIG[process.env.NODE_ENV]

class Client {
  static baseUrl: string
  static timeout: number
  private static instance: Client
  private readonly axiosClient: AxiosInstance

  private constructor(timeout = 30000, baseURL) {
    Client.baseUrl = baseURL
    Client.timeout = timeout
    this.axiosClient = axios.create({
      baseURL,
      timeout
    })
  }

  useRequestMiddleware<T = AxiosRequestConfig>(onFulfilled?: (value: T) => T | Promise<T>, onRejected?: (error: any) => any) {
    this.axiosClient.interceptors.request.use(onFulfilled, onRejected)
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Client(30000, ServiceUrl)
    }
    return this.instance
  }

  generateService = <T extends ServiceConfigObj>(configObj: T): ServiceObj<T> => {
    let res: ServiceObj<T>
    Object.keys(configObj).forEach(key => {
      const { middleware, config } = configObj[key]
      this.axiosClient.interceptors.request.use(middleware)
      const method = (param) => config(this.axiosClient)(param)
      res = {...res, ...{[key]: method}}
    })
    return res
  }
}



export default Client
