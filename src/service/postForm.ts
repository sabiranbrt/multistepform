import { request } from "./axios"

export const getFormList = () => {
    return request<any>({
        url: "1cde48fc-3284-4a54-9979-4c892fad933b",
        method: "GET",
    })
}

export const getFormSave = () => {
    return request<any>({
        url: "1cde48fc-3284-4a54-9979-4c892fad933b",
        method: "POST",
    })
}