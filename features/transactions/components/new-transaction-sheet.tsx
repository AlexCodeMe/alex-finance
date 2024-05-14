import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNewTransaction } from "../hooks/use-new-transaction";
import useCreateTransaction from "../api/use-create-transaction";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import useCreateCategory from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import useCreateAccount from "@/features/accounts/api/use-create-account";
import { Loader2 } from "lucide-react";
import { TransactionForm } from "./transaction-form";

const formSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>


export default function NewTransactionSheet() {
    const { isOpen, onClose } = useNewTransaction()

    const createMutation = useCreateTransaction()

    const categoryQuery = useGetCategories()
    const accountQuery = useGetAccounts()

    const categoryMutation = useCreateCategory()
    const accountMutation = useCreateAccount()

    const onCreateCategory = (name: string) => categoryMutation.mutate({ name })
    const onCreateAccount = (name: string) => accountMutation.mutate({ name })

    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
        label: category.name,
        value: category.id,
    }))
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
        label: account.name,
        value: account.id
    }))

    const isPending =
        createMutation.isPending ||
        categoryMutation.isPending ||
        accountMutation.isPending

    const isLoading =
        categoryQuery.isLoading ||
        accountQuery.isLoading

    const onSubmit = (values: FormValues) => {
        createMutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className='space-y-4'>
                <SheetHeader>
                    <SheetTitle>
                        New Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Create a new transaction.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div>
                        <Loader2 className='h-4 w-4 text-muted-foreground animate-spin' />
                    </div>
                ) : (
                    <TransactionForm onSubmit={onSubmit}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount} />
                )}
            </SheetContent>
        </Sheet>
    )
}
