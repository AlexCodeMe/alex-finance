'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { AreaChart, BarChart3, FileSearch, LineChart, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import BarVariant from './bar-variant'
import { AreaVariant } from './area-variant'
import { LineVariant } from './line-variant'

type Props = {
    data?: {
        date: string
        income: number
        expenses: number
    }[]
}

export default function Chart({ data = [] }: Props) {
    const [chartType, setChartType] = useState('line')

    const onTypeChange = (type: string) => {
        // if (type !== "area") {
        //   return;
        // }
    
        setChartType(type);
      }

  return (
    <Card className='border-none drop-shadow-sm'>
        <CardHeader className=''>
            <CardTitle className='text-xl line-clamp-1'>
                Transactions
            </CardTitle>
            <Select defaultValue={chartType} onValueChange={onTypeChange}>
                <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
                    <SelectValue placeholder='Chart type' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='area'>
                        <div className='flex items-center'>
                            <AreaChart className='size-4 mr-2 shrink-0' />
                            <p className='line-clamp-1'>Area chart</p>
                        </div>
                    </SelectItem>
                    <SelectItem value='line'>
                        <div className='flex items-center'>
                            <LineChart className='size-4 mr-2 shrink-0' />
                            <p className='line-clamp-1'>Line graph</p>
                        </div>
                    </SelectItem>
                    <SelectItem value='bar'>
                        <div className='flex items-center'>
                            <BarChart3 className='size-4 mr-2 shrink-0' />
                            <p className='line-clamp-1'>Bar graph</p>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
            {data.length === 0 ? (
                <div>
                    <FileSearch className='h-6 w-6 text-muted-foreground' />
                    <p className='text-muted-foreground text-xs'>
                        No data for this period
                    </p>
                </div>
            ) : (
                <>
                    {chartType === 'area' && <AreaVariant data={data} />}
                    {chartType === 'line' && <LineVariant data={data} />}
                    {chartType === 'bar' && <BarVariant data={data} />}
                </>
            )}
        </CardContent>
    </Card>
  )
}

export function ChartLoading() {
    return (
        <Card className='border-none drop-shadow-sm'> 
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-8 lg:w-[120px] w-full' />
            </CardHeader>
            <CardContent>
                <div className='h-p350px] w-full flex items-center justify-center'>
                    <Loader2 className='h-6 w-6 text-slate-300 animate-spin' />
                </div>
            </CardContent>
        </Card>
    )
}