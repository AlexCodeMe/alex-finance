'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useGetSummary } from "@/features/summary/use-get-summary"
import { formatDateRange } from "@/lib/utils"
import { PopoverClose } from "@radix-ui/react-popover"
import { format, subDays } from "date-fns"
import { ChevronDown } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import qs from 'query-string'

export default function DateFilter({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    const { isLoading } = useGetSummary()

    const defaultTo = new Date()
    const defaultFrom = subDays(defaultTo, 30)

    const to = params.get('to')
    const from = params.get('from')

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo
    }

    const [date, setDate] = useState<DateRange | undefined>(paramState)

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
            to: format(dateRange?.to || defaultTo, "yyyy-MM-dd")
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query,
        }, { skipNull: true })

        router.push(url)
    }

    const onReset = () => {
        setDate(undefined)
        pushToUrl(undefined)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm'
                    className='w-full lg:w-auto justify-between font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition'
                    disabled={isLoading}>
                    <span>{formatDateRange(paramState)}</span>
                    <ChevronDown className='ml-2 size-4 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='lg:w-auto w-full p-0' align='start'>
                <Calendar disabled={isLoading}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2} />
                <div className='p-4 w-full flex items-center gap-x-2'>
                    <PopoverClose asChild>
                        <Button variant='outline' className='w-full'
                            disabled={!date?.from || !date?.to}
                            onClick={onReset}>
                            Reset
                        </Button>
                    </PopoverClose>
                    <PopoverClose asChild>
                        <Button className='w-full'
                            disabled={!date?.from || !date?.to}
                            onClick={() => pushToUrl(date)}>
                            Apply
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}
