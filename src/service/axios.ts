import Axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import {
    encryptBody,
    encryptKey,
    generateAESKey,
    generateIV
} from "../utils/encrypt";

const headers = {} as any

export const generateRandom13DigitNumber = () => {
    return Math.floor(Math.random() * 9000000000000) + 1000000000000;
};

const url = import.meta.env.VITE_API_BASE_URL

// Configure base URL
const axios = Axios.create({
    baseURL: url,
    headers: {
        ...headers,
        "Content-Type": "application/json",
    }
})

axios.interceptors.request.use(
    async (config: any) => {
        if (config.headers.includeUrn) {
            const urn = generateRandom13DigitNumber().toString();
            config.headers.urn = urn;
        }
        delete config.headers.includeUrn;

        if ((config.method === "post") && config.data) {
            try {
                const requestInfo = {
                    ip: "ip_ac297be30055",
                    reqLat: "reqLat_931bba4b57b4",
                    reqLong: "reqLong_f7bd676464be",
                    commDeviceId: "commDeviceId_31944fcdc619",
                    requestSource: "requestSource_21cb37a23bd1"
                };
                const originalPayload = { requestInfo, ...config.data };
                const aesKey = generateAESKey();
                const iv = generateIV(aesKey);
                const reqBody = {
                    encryptedKey: encryptKey(aesKey, import.meta.env.VITE_RSA_PUBLIC_KEY),
                    encryptedBody: encryptBody(
                        JSON.stringify(originalPayload),
                        aesKey,
                        iv
                    ),
                };
                config.data = reqBody;
            } catch (error) {
                console.error("Error encrypting request data:", error);
                return Promise.reject(error);
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

/**
 * Generic request function
 */

interface ApiResponseWrapper<T> {
    apiResponseCode: string;
    apiResponseMessage: string;
    apiResponseTime: string;
    apiResponseFrom: string;
    apiResponseData: {
        responseCode: string;
        responseMessage: string;
        data: T;
    };
}

export const request = async <T>(request: AxiosRequestConfig): Promise<T> => {
    try {
        const res: AxiosResponse<ApiResponseWrapper<T>> = await axios.request(request);

        const { apiResponseCode, apiResponseMessage, apiResponseData } = res.data;

        if (apiResponseCode !== "200") {
            throw new ApiError({
                message: apiResponseMessage || "API Error",
                code: apiResponseCode,
                config: request,
                request: res.request,
                response: res
            });
        }

        if (apiResponseData?.responseCode !== "200") {
            throw new ApiError({
                message: apiResponseData.responseMessage || "Application Error",
                code: apiResponseData.responseCode,
                config: request,
                request: res.request,
                response: res
            });
        }

        return apiResponseData.data;

    } catch (err) {
        throw new ApiError(err as AxiosError);
    }
};

export class ApiError extends AxiosError {
    errorMessage: string | null;
    error: string | null;
    override response: AxiosResponse | undefined;

    constructor(err: AxiosError | { message: string; code?: string; config?: any; request?: any; response?: AxiosResponse }) {
        super(err.message, err.code, err.config, err.request, err.response);
        this.response = err.response;
        this.status = err.response?.status;
        this.message = err.message;
        this.errorMessage = this.getErrorMessage(err.response);
        this.error = err.response?.data?.error ?? null;
    }

    getErrorMessage = (response: any): string => {
        if (!response || !response.data) return "Unknown error";
        const topLevelMsg = response.data.apiResponseMessage;
        const nestedMsg = response.data.apiResponseData?.responseMessage;
        const fallbackMsg = response.data.message;
        return topLevelMsg || nestedMsg || fallbackMsg || "Unknown error";
    };
}

