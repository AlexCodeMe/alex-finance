import { client } from '@/lib/hono'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useGetConnectedBank() {
  const query = useQuery({
    queryKey: ['connected-bank'],
    queryFn: async () => {
        const response = await client.api.plaid['connected-bank'].$get()

        if (!response.ok) throw new Error('Failed to fetch connected bank')

        const { data } = await response.json()

        return data
    }
  })

  return query
}
