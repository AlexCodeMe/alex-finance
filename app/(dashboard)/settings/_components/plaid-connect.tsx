'use client'

import { Button } from '@/components/ui/button'
import useCreateLinkToken from '@/features/plaid/api/use-create-link-token'
import React, { useState } from 'react'
import { useMount } from 'react-use'

export default function PlaidConnect() {
    const [token, setToken] = useState<string | null>(null)

    const createLinkTokenMutation = useCreateLinkToken()

    useMount(() => {
        createLinkTokenMutation.mutate(undefined, {
            onSuccess: ({ data }) => {
                console.log(data)
                setToken(data.link_token)
            }
        })
    })

    const onClick = () => {}
  return (
    <Button variant='ghost' size='sm'
        onClick={onClick}
        disabled={false}>
        Connect
    </Button>
  )
}
