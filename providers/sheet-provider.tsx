'use client'


import NewAccountSheet from '@/features/accounts/components/new-account-sheet'
import React from 'react'
import { useMountedState } from 'react-use'

export default function SheetProvider() {
    const isMounted = useMountedState()

    if (!isMounted) return null

  return (
    <>
        <NewAccountSheet />
        {/* <EditAccountSheet />

        <NewCategorySheet />
        <EditCategorySheet />

        <NewTransactionSheet />
        <EditTransactionSheet /> */}
    </>
  )
}
