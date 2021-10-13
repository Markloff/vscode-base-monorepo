import {AxiosInstance, AxiosPromise, AxiosRequestConfig} from "axios"
import {truncate} from "fs";


export type ServiceBuilder<PT,RT> = (axiosInstance: AxiosInstance) => (param?: PT) => AxiosPromise<RT>

export type middleware<V = AxiosRequestConfig> = (value: V) => V | Promise<V>


export type ServiceConfig<PT = any,RT = any> = {
  config: ServiceBuilder<PT,RT>,
  middleware: middleware
}

export type ServiceConfigObj = {
  [key: string]: ServiceConfig
}

type UnWrap<T> = T extends {
  config: (axiosInstance: AxiosInstance) => (param?: infer PT) => AxiosPromise<infer RT>,
  middleware: middleware
} ? [PT, RT]: any

export type ServiceObj<T> = {
  [key in keyof T]: (param?: UnWrap<T[key]>[0]) => AxiosPromise<UnWrap<T[key]>[1]>
}
