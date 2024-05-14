import { useOpenAccount } from '@/features/accounts/hooks/use-open-account';
import { useOpenTransaction } from '@/features/transactions/hooks/use-open-transaction';
import { cn } from '@/lib/utils';
import { TriangleAlert } from 'lucide-react';
import React from 'react'

type Props = {
    id: string;
    account: string | null;
    accountId: string | null;
}

export default function AccountColumn({
    id, account, accountId
}: Props) {
    const { onOpen: onOpenTransaction } = useOpenTransaction();
    const { onOpen: onOpenAccount } = useOpenAccount()

    const onClick = () => {
        if (accountId) {
            onOpenAccount(accountId);
        } else {
            onOpenTransaction(id);
        }
    }

    return (
        <div onClick={onClick}
            className={cn(
                'flex items-center cursor-pointer hover:underline',
                !account && 'text-rose-500'
            )}>
            {!account && <TriangleAlert className='mr-2 h-4 w-4 shrink-0' />}
            {account || 'Uncategorized'}
        </div>
    )
}