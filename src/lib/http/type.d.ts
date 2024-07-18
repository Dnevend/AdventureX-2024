/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<D = any> {
    data: D
}

export interface HttpErrorResponse {
    error: {
        code: number
        message: string
    }
}