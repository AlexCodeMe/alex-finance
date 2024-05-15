'use client'

import { Button } from '@/components/ui/button'
import useCreateLinkToken from '@/features/plaid/api/use-create-link-token'
import { usePlaidLink } from 'react-plaid-link'
import React, { useState } from 'react'
import { useMount } from 'react-use'
import useExchangePublicToken from '@/features/plaid/api/use-exchange-public-token'
import { useConfirm } from '@/hooks/use-confirm'
import useDeleteConnectedBank from '@/features/plaid/api/use-delete-connected-bank'

export default function PlaidDisconnect() {
    const [Dialog, confirm] = useConfirm(
        'Are you sure?',
        'This is going to disconnect your bank account and remove all data'
    )

    const mutation = useDeleteConnectedBank()

    const onClick = async () => {
        const ok = await confirm()

        if (ok) {
            mutation.mutate()
        }
    }

    return (
        <>
            <Dialog />
            <Button variant='ghost' size='sm'
                onClick={onClick}
                disabled={mutation.isPending}>
                Disconnect
            </Button>
        </>
    )
}
