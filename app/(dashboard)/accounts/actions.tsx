'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDeleteAccount } from '@/features/accounts/api/use-delete-account'
import { useOpenAccount } from '@/features/accounts/hooks/use-open-account'
import { useConfirm } from '@/hooks/use-confirm'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'

export default function Actions({ id }: { id: string }) {
    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'You are about to delete this account.'
    )

    const { onOpen: onOpenAccount } = useOpenAccount()
    const deleteMutation = useDeleteAccount(id)

    const handleDelete = async () => {
        const ok = await confirm()

        if (ok) deleteMutation.mutate()
    }


  return (
    <>
        <ConfirmDialog />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'
                    className='size-8 p-0'>
                    <span className='sr-only'>Open menu</span>
                    <MoreHorizontal className='size-4' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem disabled={deleteMutation.isPending}
                    onClick={() => onOpenAccount(id)}>
                    <Edit className='size-4 mr-2' />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem disabled={deleteMutation.isPending}
                    onClick={handleDelete}>
                    <Trash className='size-4 mr-2' />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}
