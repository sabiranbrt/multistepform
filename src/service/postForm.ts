import type { FormValues } from "../types"
import { request } from "./axios"

export const getFormList = () => {
    return request<any>({
        url: "data",
        method: "GET",
        headers: {
            includeUrn: true,
        }
    })
}

export const getFormSave = (body: FormValues) => {
    return request<any>({
        url: "data",
        method: "POST",
        headers: { includeUrn: true },
        data: body
    })
}