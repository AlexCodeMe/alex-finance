'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus } from 'lucide-react'
import React, { useState } from 'react'
import { columns } from './columns'
import { Skeleton } from '@/components/ui/skeleton'
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction'
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions'
import { useBulkDeletetransactions } from '@/features/transactions/api/use-bulk-delete-transactions'
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions'
import { transactions as transactionsSchema} from '@/db/schema'
import { toast } from 'sonner'
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account'
import { DataTable } from '@/components/data-table'
import UploadButton from './_components/upload-button'
import { ImportCard } from './_components/import-card'

enum VARIANTS {
    LIST = 'LIST',
    IMPORT = 'IMPORT',
}

const INITIAL_IMPORT_RESULTS = { data: [], errors: [], meta: {} }

export default function TransactionsPage() {
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST)
    const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS)

    const [AccountDialog, confirm] = useSelectAccount()

    const { onOpen } = useNewTransaction()
    const bulkCreateMutation = useBulkCreateTransactions()
    const bulkDeleteMutation = useBulkDeletetransactions()
    const transactionsQuery = useGetTransactions()
    const transactionsData = transactionsQuery.data || []

    const isDisabled =
        transactionsQuery.isLoading ||
        bulkDeleteMutation.isPending

    const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
        setImportResults(results)
        setVariant(VARIANTS.IMPORT)
    }

    const onCancelImport = () => {
        setImportResults(INITIAL_IMPORT_RESULTS)
        setVariant(VARIANTS.LIST)
    }

    const onSubmitImport = async (values: typeof transactionsSchema.$inferInsert[]) => {
        const accountId = await confirm()

        if (!accountId) return toast.error('Select an account to continue.')

        const data = values.map((value) => ({
            ...value,
            accountId: accountId as string
        }))

        bulkCreateMutation.mutate(data, {
            onSuccess: () => {
                onCancelImport()
            }
        })
    }

    return transactionsQuery.isLoading ? (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader>
                    <Skeleton className='h-8 w-48' />
                </CardHeader>
                <CardContent>
                    <div className='h-[500px] w-full flex items-center justify-center'>
                        <Loader2 className='h-6 w-6 text-slate-300 animate-spin' />
                    </div>
                </CardContent>
            </Card>
        </div>
    ) : variant === VARIANTS.IMPORT ? (
        <>
            <AccountDialog />
            <ImportCard data={importResults.data}
                onCancel={onCancelImport}
                onSubmit={onSubmitImport} />
        </>
    ) : (
        <div className='max-w-screen-2xl mx-auto w-full pb-10 -mt-24'>
            <Card className='border-none drop-shadow-sm'>
                <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
                    <CardTitle className='text-xl line-clamp-1'>
                        Transaction History
                    </CardTitle>
                    <div className='flex items-center gap-x-2'>
                        <Button onClick={onOpen}
                            size='sm'
                            className='w-full lg:w-auto'>
                            <Plus className='size-4 mr-2' />
                            Add new
                        </Button>
                        <UploadButton onUpload={onUpload} />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns}
                        data={transactionsData}
                        filterKey='payee'
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)

                            bulkDeleteMutation.mutate({ ids })
                        }}
                        disabled={isDisabled} />
                </CardContent>
            </Card>
        </div>
    )
}
