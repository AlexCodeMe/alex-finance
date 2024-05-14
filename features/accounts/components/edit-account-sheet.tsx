import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import AccountForm from "./account-form";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { useConfirm } from "@/hooks/use-confirm"
import { Loader2 } from "lucide-react";
import { useDeleteAccount } from "../api/use-delete-account";
import { useEditAccount } from "../api/use-edit-account";

const formSchema = insertAccountSchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export default function EditAccountSheet() {
    const { id, isOpen, onClose } = useOpenAccount()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'You are about to delete this account.'
    )

    const accountQuery = useGetAccount(id)
    const editMutation = useEditAccount(id)
    const deleteMutation = useDeleteAccount(id)

    const isPending = editMutation.isPending

    const isLoading = accountQuery.isLoading || deleteMutation.isPending

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name,
    } : undefined

    const onSubmit = (values: FormValues) => {
        editMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    const onDelete = async () => {
        const ok = await confirm()

        if (ok) {
            deleteMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className='space-y-4'>
                    <SheetHeader>
                        <SheetTitle>
                            Edit Account
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing account.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-cene=ter'>
                            <Loader2 className='h-4 w-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <AccountForm id={id}
                            onSubmit={onSubmit}
                            disabled={isPending}
                            onDelete={onDelete}
                            defaultValues={defaultValues} />
                    )}
                </SheetContent>
            </Sheet>
        </>

    )
}
