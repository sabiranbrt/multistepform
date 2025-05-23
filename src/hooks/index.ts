import { useMutation, useQuery } from "@tanstack/react-query"
import { getFormList, getFormSave } from "../service/postForm"
import { useDispatch } from "react-redux"
import { updateLoading } from "../redux/slices/appSlice"
import toast from "react-hot-toast"
import { ResponseType } from "../types"
import { queryClient } from "../utils/query"

export const useFormList = () => {
    const formList = useQuery({
        queryKey: ['FORM_LIST'],
        queryFn: getFormList,
    })
    return formList
}

export const useSaveForm = () => {
    const dispatch = useDispatch();
    const query = useMutation({
        mutationFn: getFormSave,
        onError: (error) => {
            toast(error?.message);
            dispatch(updateLoading({ isLoading: false }))
        },

        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ['FORM_LIST'] })
            const data = response
            if (data?.type === ResponseType.ERROR) {
                toast(data?.message);
            }
            toast("Form Submittted");
            dispatch(updateLoading({ isLoading: false }))
        },
    })
    return query
}