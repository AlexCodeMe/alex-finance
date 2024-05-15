'use client'

import { formatDateRange } from '@/lib/utils'
import React from 'react'
import DataCard, { DataCardLoading } from './data-card'
import { FaPiggyBank } from "react-icons/fa"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"
import { useGetSummary } from '@/features/summary/use-get-summary'
import { useGetPeriod } from '@/hooks/use-get-period'

export default function DataGrid() {
    const period = useGetPeriod()
    const { data, isLoading } = useGetSummary()

    const dateRangeLabel = formatDateRange(period)

    return isLoading ? (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
            <DataCardLoading />
            <DataCardLoading />
            <DataCardLoading />
        </div>
    ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
            <DataCard title='Remaining'
                value={data?.remainingAmount}
                percentageChange={data?.remainingChange}
                icon={FaPiggyBank}
                variant='default'
                dateRange={dateRangeLabel} />
            <DataCard title='Income'
                value={data?.incomeAmount}
                percentageChange={data?.incomeChange}
                icon={FaArrowTrendUp}
                variant='success'
                dateRange={dateRangeLabel} />
            <DataCard title='Expenses'
                value={data?.expensesAmount}
                percentageChange={data?.expensesChange}
                icon={FaArrowTrendDown}
                variant='danger'
                dateRange={dateRangeLabel} />
        </div>
    )
}
