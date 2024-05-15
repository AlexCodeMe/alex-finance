import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.subscriptions.portal.$post>

import React from 'react'
import { toast } from "sonner";

export default function useManageSubscription() {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
        const response = await client.api.subscriptions.portal.$post()

        return await response.json()
    },
    onSuccess: ({ data }) => {
        window.location.href = data
    },
    onError: () => {
        toast.error('Failed to create portal.')
    }
  })

  return mutation
}
