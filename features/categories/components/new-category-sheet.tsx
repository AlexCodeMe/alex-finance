import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useNewCategory } from "../hooks/use-new-category";
import useCreateCategory from "../api/use-create-category";
import CategoryForm from "./category-form";

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>


export default function NewCategorySheet() {
    const { isOpen, onClose } = useNewCategory()
    const mutation = useCreateCategory()

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
                <SheetTitle>
                    New Category
                </SheetTitle>
                <SheetDescription>
                    Create a new category to organize your transactions.
                </SheetDescription>
            </SheetHeader>
            <CategoryForm onSubmit={onSubmit}
                disabled={mutation.isPending}
                defaultValues={{
                    name: '',
                }} />
        </SheetContent>
    </Sheet>
  )
}
