import { useMutation, useQuery } from "@tanstack/react-query"
import { getFormList, getFormSave } from "../service/postForm"

export const useFormsave = () => {
    const formList = useQuery({
        queryKey: ['FORM_LIST'],
        queryFn: getFormList,
    })
    return formList
}

export const useSaveForm = () => {
    const query = useMutation({
        mutationFn: getFormSave,
        onError: (error) => {
            console.log("error", error)
        },

        onSuccess: (response) => {
            // const data = response
            // if (data?.type === ResponseType.ERROR) {
            //     Toast.show({
            //         type: ALERT_TYPE.SUCCESS,
            //         title: "Error",
            //         textBody: response?.data?.message,
            //     })
            // }
            // updateLoading({ isLoading: false })
            console.log("success", response)
        },
    })
    return query
}