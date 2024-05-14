import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React from 'react'
import { useNewAccount } from '../hooks/use-new-account';
import useCreateAccount from '../api/use-create-account';
import AccountForm from './account-form';
import { z } from 'zod';
import { insertAccountSchema } from '@/db/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = insertAccountSchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

export default function NewAccountSheet() {
    const { isOpen, onClose } = useNewAccount()

    const mutation = useCreateAccount()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
        }
    })

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                form.reset()
                onClose()
            }
        })
    }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
            <SheetHeader>
                <SheetTitle>New Account</SheetTitle>
                <SheetDescription>
                    Create a new account and track your transactions.
                </SheetDescription>
            </SheetHeader>
            <AccountForm onSubmit={onSubmit} disabled={mutation.isPending}
                defaultValues={{ name: '' }} />
        </SheetContent>
    </Sheet>
  )
}
