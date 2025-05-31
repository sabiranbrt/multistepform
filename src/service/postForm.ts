/* eslint-disable @typescript-eslint/no-explicit-any */
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
   const postMethod = localStorage.getItem("dynamicMethod")
    return request<any>({
        url: postMethod ?? "",
        method: "POST",
        headers: { includeUrn: true },
        data: body
    })
}