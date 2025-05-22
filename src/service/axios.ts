import Axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import {
    encryptBody,
    generateAESKey,
    generateIV
} from "../utils/encrypt";

export class ApiError extends AxiosError {
    errorMessage: string | null
    error: string | null
    override response: AxiosResponse | undefined
    constructor({ message, code, config, request, response }: AxiosError<any>) {
        super(message, code, config, request, response)
        this.response = response
        this.status = response?.status
        this.message = message
        this.errorMessage = response ? this.getErrorMessage(response) : message
        this.error = response?.data?.error
    }

    getErrorMessage = (response: any) => {
        const errorData = response?.data
        if (Array.isArray(errorData?.message) && errorData?.message?.[0]) {
            return errorData?.message[0]
        }
        return errorData?.message
    }
}

const headers = {} as any
// Configure base URL
const axios = Axios.create({
    baseURL: "https://mocki.io/v1/",
    headers: { ...headers, "Content-Type": "application/json" }
})

// Add response interceptor for handling errors globally
// axios.interceptors.request.use(
//     async (config: any) => {
//         // if (loginStatus?.access_token) {
//         //     console.log("----ACCESS TOKEN----")
//         //     return {
//         //         ...config,
//         //         headers: {
//         //             ...config.headers,
//         //             Authorization: `Bearer ${loginStatus?.access_token}`,
//         //         },
//         //     }
//         // }
//         console.log("----NO ACCESS TOKEN----", config)
//         return config
//     },
//     function (error) {
//         return Promise.reject(error)
//     },
// )

axios.interceptors.request.use(
    async (config: any) => {
        const requestInfo = {
            ip: "ip_ac297be30055",
            reqLat: "reqLat_931bba4b57b4",
            reqLong: "reqLong_f7bd676464be",
            commDeviceId: "commDeviceId_31944fcdc619",
            requestSource: "requestSource_21cb37a23bd1"
        };
        if ((config.method === "post") && config.data) {
            try {
                const originalPayload = config.data;
                const aesKey = generateAESKey();
                const iv = generateIV(aesKey);

                const encryptedBody = encryptBody(JSON.stringify(originalPayload), aesKey, iv);
                const encryptedRequestInfo = encryptBody(JSON.stringify(requestInfo), aesKey, iv);

                config.data = { encryptedBody, encryptedRequestInfo };

            } catch (error) {
                console.error("Error encrypting request data:", error);
                return Promise.reject(error);
            }
        }
        config.headers = {
            ...config.headers,
        };
        return config;
    },
    error => Promise.reject(error)
);

/**
 * Generic request function
 */
// Response Interceptor

// axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         const { logout } = useLoginStore.getState()
//         if (error?.response?.status === 401 && error?.response?.data?.message?.toLowerCase() === "token expired") {
//             console.log("CAME HERE")
//             Toast.show({
//                 type: ALERT_TYPE.INFO,
//                 title: "Login Expired",
//                 textBody: "Please login again",
//             })
//             logout()
//         }
//         return Promise.reject(error)
//     }
// )

export const request = async <T>(request: AxiosRequestConfig): Promise<T> => {
    try {
        const res: AxiosResponse<T> = await axios.request<T>(request)

        // if ((res.data as any)?.type === "error") {
        //   throw new Error((res.data as any)?.message || "An error occurred")
        // }
        return res.data // TypeScript will infer this as T
    } catch (err) {
        throw new ApiError(err as AxiosError)
    }
}

// API Service Methods
