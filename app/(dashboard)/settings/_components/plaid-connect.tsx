'use client'

import { Button } from '@/components/ui/button'
import useCreateLinkToken from '@/features/plaid/api/use-create-link-token'
import { usePlaidLink } from 'react-plaid-link'
import React, { useState } from 'react'
import { useMount } from 'react-use'
import useExchangePublicToken from '@/features/plaid/api/use-exchange-public-token'
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall'

export default function PlaidConnect() {
    const [token, setToken] = useState<string | null>(null)

    const { shouldBlock, triggerPaywall, isLoading } = usePaywall()

    const createLinkTokenMutation = useCreateLinkToken()
    const exchangePublicTokenMutation = useExchangePublicToken()

    useMount(() => {
        createLinkTokenMutation.mutate(undefined, {
            onSuccess: ({ data }) => {
                setToken(data.link_token)
            }
        })
    })

    const plaid = usePlaidLink({
        token: token,
        onSuccess: (publicToken) => {
            exchangePublicTokenMutation.mutate({
                publicToken,
            })
        },
        env: 'sandbox'
    })
    
    const onClick = () => {
        if (shouldBlock) {
            triggerPaywall()

            return
        }

        plaid.open()
    }

    const isDisabled = !plaid.ready
        || exchangePublicTokenMutation.isPending
        || isLoading

  return (
    <Button variant='ghost' size='sm'
        onClick={onClick}
        disabled={isDisabled}>
        Connect
    </Button>
  )
}
