import { Button } from '@/components/ui/button'
import useCheckoutSubscription from '../api/use-checkout-subscription'

export default function SubscriptionCheckout() {
    const checkoutMutation = useCheckoutSubscription()

  return (
    <Button variant='ghost' size='sm'
        onClick={() => checkoutMutation.mutate()}
        disabled={checkoutMutation.isPaused}>
        Upgrade
    </Button>
  )
}
