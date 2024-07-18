/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { HttpErrorResponse, HttpResponse } from "./type";
import type {
    InternalAxiosRequestConfig,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance,
    AxiosError
} from 'axios'

const API_KEY = '3774f58e58ee195a6ef7305a5e9e1e10.S85PhbgVquTzJjr5'

export class Http {

    instance: AxiosInstance

    baseConfig: AxiosRequestConfig = {
        baseURL: 'https://open.bigmodel.cn',
        headers: { 'Content-Type': 'application/json' }
    }

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(Object.assign(this.baseConfig, config))

        this.instance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {

                config.headers['Authorization'] = `Bearer ${API_KEY}`

                return config
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )

        this.instance.interceptors.response.use(
            (response: AxiosResponse<HttpResponse>) => {
                return response
            },
            (error: AxiosError<HttpErrorResponse>) => {
                // TODO: process error
                return Promise.reject(error.response)
            }
        )

        this.instance.interceptors.response.use(
            (response: AxiosResponse<HttpResponse>) => {
                return { ...response, ...response.data }
            }
        )
    }

    public get<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.instance.get(url, config)
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.instance.post(url, data, config)
    }

    public put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.instance.put(url, data, config)
    }

    public patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.instance.patch(url, data, config)
    }

    public delete<T = any>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<HttpResponse<T>> {
        return this.instance.delete(url, config)
    }
}

export default new Http({})