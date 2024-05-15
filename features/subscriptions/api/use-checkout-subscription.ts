import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.subscriptions.checkout.$post>

export default function useCheckoutSubscription() {
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.subscriptions.checkout.$post()

            return await response.json()
        },
        onSuccess: ({ data }) => {
            window.location.href = data
        },
        onError: () => {
            toast.error('Failed to create checkout.')
        }
    })

    return mutation
}