import { Button } from '@/components/ui/button'
import { usePaywall } from '@/features/subscriptions/hooks/use-paywall'
import { Upload } from 'lucide-react'
import React from 'react'
import { useCSVReader } from "react-papaparse"

export default function UploadButton({ onUpload }: {
    onUpload: (results: any) => void
}) {
    const { CSVReader } = useCSVReader()
    const { shouldBlock, triggerPaywall } = usePaywall()

  return shouldBlock ? (
    <Button size='sm'
        onClick={triggerPaywall}
        className='w-full lg:w-auto'>
        <Upload className='size-4 mr-2' />
        Import
    </Button>
  ) : (
    <CSVReader onUploadAccepted={onUpload}>
        {({ getRootProps }: any) => (
            <Button size='sm'
                {...getRootProps()}
                className='w-full lg:w-auto'>
                <Upload className='size-4 mr-2' />
                Import
            </Button>
        )}
    </CSVReader>
  )
}
