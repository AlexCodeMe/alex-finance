import { 
    RadialBar,
    RadialBarChart,
    Legend, 
    ResponsiveContainer, 
    Tooltip
  } from 'recharts'
  import { useMedia } from 'react-use'
  
  import { formatCurrency, formatPercentage } from '@/lib/utils'
  
  const COLORS = ['#0062FF', '#12C6FF', '#FF647F', '#FF9354']
  
  type Props = {
    data: {
      name: string
      value: number
    }[]
  }
  
  export default function RadialVariant({ data }: Props) {
    const isMobile = useMedia('(max-width: 1024px)', false)
  
    return (
      <ResponsiveContainer width='100%' height={350}>
        <RadialBarChart cx='50%' cy='30%'
          barSize={10}
          innerRadius='90%' outerRadius='40%' 
          data={data.map((item, index) => ({
            ...item,
            fill: COLORS[index % COLORS.length]
          }))}>
          <RadialBar dataKey='value'
            label={{ 
              position: 'insideStart', 
              fill: '#fff',
              fontSize: '12px'
            }}
            background
          />
          <Legend layout='horizontal' 
            verticalAlign='bottom'
            align='right'
            iconType='circle'
            content={({ payload }: any) => {
              return (
                <ul className='flex flex-col space-y-2'>
                  {payload.map((entry: any, index: number) => (
                    <li key={`item-${index}`} className='flex items-center space-x-2'>
                      <span className='size-2 rounded-full' style={{ backgroundColor: entry.color }} />
                      <div className='space-x-1'>
                        <span className='text-sm text-muted-foreground'>{entry.value}</span>
                        <span className='text-sm'>{formatCurrency(entry.payload.value)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )
            }} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
        </RadialBarChart>
      </ResponsiveContainer>
    )
  }
  