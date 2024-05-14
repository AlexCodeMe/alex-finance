import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useDeleteCategory } from "../api/use-delete-category";
import CategoryForm from "./category-form";

const formSchema = insertCategorySchema.pick({
    name: true,
})

type FormValues = z.input<typeof formSchema>

export default function EditCategorySheet() {
    const { id, isOpen, onClose } = useOpenCategory()

    const [ConfirmDialog, confirm] = useConfirm(
        'Are you sure?',
        'You are about to delete this transaction.'
    )

    const categoryQuery = useGetCategory(id)
    const editMutation = useEditCategory(id)
    const deleteMutation = useDeleteCategory(id)

    const isPending = editMutation.isPending

    const isLoading = categoryQuery.isLoading || deleteMutation.isPending

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name,
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
                            Edit Category
                        </SheetTitle>
                        <SheetDescription>
                            Edit an existing category.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className='absolute inset-0 flex items-center justify-cene=ter'>
                            <Loader2 className='h-4 w-4 text-muted-foreground animate-spin' />
                        </div>
                    ) : (
                        <CategoryForm id={id}
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
