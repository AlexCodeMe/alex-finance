import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import useCheckoutSubscription from '../api/use-checkout-subscription'
import { useSubscriptionModal } from '../hooks/use-subscription-modal'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SubscriptionModal() {
    const checkoutMutation = useCheckoutSubscription()
    const { isOpen, onClose } = useSubscriptionModal()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader className='flex items-center space-y-4'>
                <Image src='/logo-dark.svg' alt='logo'
                    width={36} height={36} />
                <DialogTitle className='text-center'>
                    Upgrade to our paid plan
                </DialogTitle>
                <DialogDescription className='text-center'>
                    Upgrade and unlock all the awesome features!
                </DialogDescription>
            </DialogHeader>
            <Separator />
            <ul className='space-y-2'>
                <li className='flex items-center'>
                    <CheckCircle2 className='h-5 w-5 mr-2 fill-blue-500 text-white' />
                    Sync bank
                </li>
                <li className='flex items-center'>
                    <CheckCircle2 className='h-5 w-5 mr-2 fill-blue-500 text-white' />
                    Upload CSV files instantly
                </li>
                <li className='flex items-center'>
                    <CheckCircle2 className='h-5 w-5 mr-2 fill-blue-500 text-white' />
                    More chart types
                </li>
            </ul>
            <DialogFooter className='pt-2 mt-4 gap-y-2'>
                <Button className='w-full'
                    disabled={checkoutMutation.isPending}
                    onClick={() => checkoutMutation.mutate()}>
                    Upgrade 🏫
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
