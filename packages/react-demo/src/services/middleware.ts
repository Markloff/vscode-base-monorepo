import {AxiosRequestConfig} from "axios";

/**
 * 离开页面时取消已经发送的请求
 * @param config
 */
export const cancelRequest = (config: AxiosRequestConfig) => {
  console.log('cancel request')
  return config
}

/**
 * 发起请求时进行授权检查
 * @param config
 */
export const verifyAuthorization = (config: AxiosRequestConfig) => {
  console.log('cancel verify')
  return config
}

/**
 * 错误统一上报
 * @param request
 * @param err
 */
export const reportHttpErr = (request: string, err: any) => {

  // todo page, params, response
}
