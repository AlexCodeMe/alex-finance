'use cilent'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { FileSearch, Loader2, PieChart, Radar, Target } from 'lucide-react'
import React, { useState } from 'react'
import PieVariant from './pie-variant'
import RadarVariant from './radar-variant'
import RadialVariant from './radial-variant'

type Props = {
    data?: {
        name: string
        value: number
    }[]
}

export default function SpendingPie({ data = []}: Props) {
    const [chartType, setChartType] = useState('pie')

    // const { shouldBlock, triggerPayway } = usePaywall()

    const onTypeChange = (type: string) => {
        setChartType(type)
    }

  return (
    <Card className='border-none drop-shadow-sm'>
        <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
            <CardTitle className='text-xl line-clamp-1'>
                Categories
            </CardTitle>
            <Select defaultValue={chartType} onValueChange={onTypeChange}>
                <SelectTrigger className='lg:w-auto h-9 rounded-md px-3'>
                    <SelectValue placeholder='Chart type' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='pie'>
                        <div className='flex items-center'>
                            <PieChart className='size-4 mr-2 shrink-0' />
                            <p className='line-clamp-1'>
                                Pie chart
                            </p>
                        </div>
                    </SelectItem>
                    <SelectItem value='radar'>
                        <div className='flex items-center'>
                            <Radar className='size-4 mr-2 shrink-0' />
                            <p className='line-clamp-1'>
                                Radar chart
                            </p>
                        </div>
                    </SelectItem>
                    <SelectItem value='radio'>
                        <div className='flex items-center'>
                            <Target className='size-4 mr-2 shrink-0' />
                            <p className='line-clamp-1'>
                                Radial chart
                            </p>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent>
            {data.length === 0 ? (
                <div>
                    <FileSearch />
                    <p>
                        No data in this period
                    </p>
                </div>
            ) : (
                <>
                    {chartType === 'pie' && <PieVariant data={data} />}
                    {chartType === 'radar' && <RadarVariant data={data} />}
                    {chartType === 'radio' && <RadialVariant data={data} />}
                </>
            )}
        </CardContent>
    </Card>
  )
}

export function SpendingPieLoading() {
    return (
        <Card className='border-none drop-shadow-sm'>
            <CardHeader className='flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between'>
                <Skeleton className='h-8 w-48' />
                <Skeleton className='h-8 lg:w-[120px] w-full' />
            </CardHeader>
            <CardContent>
                <div className='h-[350px] w-full flex items-center justify-center'>
                    <Loader2 className='h-6 w-6 text-slate-300 animate-spin' />
                </div>
            </CardContent>
        </Card>
    )
}