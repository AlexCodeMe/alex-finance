import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { insertCategorySchema } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = insertCategorySchema.pick({
    name: true
})

type FormValues = z.input<typeof formSchema>

type Props = {
    id?: string
    defaultValues?: FormValues
    onSubmit: (values: FormValues) => void
    onDelete?: () => void
    disabled?: boolean
}

export default function CategoryForm({
    id,
    onSubmit,
    disabled,
    onDelete,
    defaultValues,
}: Props) {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const handleSubmit = (values: FormValues) => {
        console.log(values)
        onSubmit(values)
    }

    const handleDelete = () => {
        onDelete?.()
    }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4 pt-4'>
            <FormField name='name'
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder='e.g., Food, Travel, etc.'
                                disabled={disabled}
                                {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            <Button disabled={disabled}
                className='w-full'>
                {id ? 'Save changes' : 'Create category'}
            </Button>
            {!!id && (
                <Button type='button'
                    variant='outline'
                    size='icon'
                    disabled={disabled}
                    onClick={handleDelete}
                    className='w-full'>
                    <Trash className='size-4 mr-2' />
                    Delete category
                </Button>
            )}
        </form>
    </Form>
  )
}