'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'
import PlaidConnect from './plaid-connect'

export default function SettingsCard() {
    const connectedBank = null

  return (
    <Card className='border-none drop-shadow-sm'>
        <CardHeader>
            <CardTitle className='text-xl line-clamp-1'>
                Settings
            </CardTitle>
        </CardHeader>
        <CardContent>
            <Separator />
            <div className='flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row items-center py-4'>
                <p className='text-sm font-medium w-full lg:w-[16.5rem]'>
                    Bank Account
                </p>

                <div className='w-full flex items-center justify-between'>
                    <div className={cn(
                        'text-sm truncated flex items-center',
                        !connectedBank && 'text-muted-foreground'
                    )}>
                        {connectedBank
                            ? `Bank account connected`
                            : 'No bank account connected'
                        }
                    </div>
                    {connectedBank ? <p>PlaidDisconnect</p> : <PlaidConnect /> }
                </div>
            </div>
            <div className='flex flex-col gap-y-2 lg:gap-y-0 lg:flex-row items-center py-4'>
                <p className='text-sm font-medium w-full lg:w-[16.5rem]'>
                    Bank Account
                </p>

                <div className='w-full flex items-center justify-between'>
                    <div className={cn(
                        'text-sm truncated flex items-center',
                        !connectedBank && 'text-muted-foreground'
                    )}>
                        {connectedBank
                            ? `Subscription ${connectedBank}`
                            : 'No Active Subscription'
                        }
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export const SettingsCardLoading = () => {
    <Card className='border-none drop-shadow-sm'>
        <CardHeader>
            <CardTitle className='text-xl line-clamp-1'>
                <Skeleton className='h-6 w-24' />
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className='h-[350px] w-full flex items-center justify-center'>
                <Loader2 className='h-6 w-6 text-slate-300 animate-spin' />
            </div>
        </CardContent>
    </Card>
}
