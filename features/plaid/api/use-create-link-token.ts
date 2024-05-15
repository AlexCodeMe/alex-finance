import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.plaid['create-link-token']['$post']>

export default function useCreateLinkToken() {
    const mutation = useMutation<ResponseType, Error>({
        mutationFn: async () => {
            const response = await client.api.plaid['create-link-token'].$post()

            return await response.json()
        },
        onSuccess: () => {
            toast.success('Link token created')
        },
        onError: () => {
            toast.error('Failed to create link token.')
        }
    })

    return mutation
}