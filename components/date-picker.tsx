'use client'

import React from 'react'
import { SelectSingleEventHandler } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from './ui/calendar'

type Props = {
    value?: Date
    onChange?: SelectSingleEventHandler
    disabled?: boolean
}

export default function DatePicker({
    value, onChange, disabled
}: Props) {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant='outline'
                disabled={disabled}
                className={cn(
                    'w-full justify-start text-left font-normal',
                    !value && 'text-muted-foreground'
                )}>
                <CalendarIcon />
                {value ? format(value, 'PPP') : <span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
        <Calendar mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          initialFocus />
        </PopoverContent>
    </Popover>
  )
}