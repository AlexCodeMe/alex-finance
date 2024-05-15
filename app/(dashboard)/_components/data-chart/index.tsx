'use client'

import React from 'react'
import Chart, { ChartLoading } from './chart'
import SpendingPie, { SpendingPieLoading } from './spending-pie'
import { useGetSummary } from '@/features/summary/use-get-summary'

export default function DataCharts() {
    const { data, isLoading } = useGetSummary()

  return isLoading ? (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
            <ChartLoading />
        </div>
        <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
            <SpendingPieLoading />
        </div>
    </div>
  ) : (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
            <Chart data={data?.days} />
        </div>
        <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
            <SpendingPie data={data?.categories} />
        </div>
    </div>
  )
}
