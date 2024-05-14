'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useDeleteCategory } from '@/features/categories/api/use-delete-category'
import { useOpenCategory } from '@/features/categories/hooks/use-open-category'

import { useConfirm } from '@/hooks/use-confirm'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import React from 'react'

export default function Actions({ id }: { id: string }) {
    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'You are about to delete this transaction.'
    )

    const { onOpen: onOpenCategory } = useOpenCategory()
    const deleteMutation = useDeleteCategory(id)

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
                    onClick={() => onOpenCategory(id)}>
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
