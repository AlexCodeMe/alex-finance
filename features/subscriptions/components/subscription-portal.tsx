import { Button } from '@/components/ui/button'
import React from 'react'
import useManageSubscription from '../api/use-manage-subscription'

export default function SubscriptionPortal() {
    const manageMutation = useManageSubscription()

  return (
    <Button variant='ghost' size='sm'
        onClick={() => manageMutation.mutate()}
        disabled={manageMutation.isPending}>
        Manage Subscription
    </Button>
  )
}
