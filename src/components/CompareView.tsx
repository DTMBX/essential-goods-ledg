import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PriceChart } from '@/components/PriceChart'
import { X, Export, Info } from '@phosphor-icons/react'
import { ITEMS, getItemById, getPriceHistory } from '@/lib/data'
import type { MetricMode } from '@/lib/types'
import { toast } from 'sonner'

interface CompareViewProps {
  selectedItemIds: string[]
  onRemoveItem: (itemId: string) => void
  hourlyWage: number
}

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)'
]

export function CompareView({ selectedItemIds, onRemoveItem, hourlyWage }: CompareViewProps) {
  const [metricMode, setMetricMode] = useState<MetricMode>('nominal')
  const [dateRange, setDateRange] = useState<'1y' | '5y' | '10y' | 'all'>('5y')

  const getDateRangeFilter = () => {
    const now = new Date()
    switch (dateRange) {
      case '1y':
        return new Date(now.setFullYear(now.getFullYear() - 1)).toISOString()
      case '5y':
        return new Date(now.setFullYear(now.getFullYear() - 5)).toISOString()
      case '10y':
        return new Date(now.setFullYear(now.getFullYear() - 10)).toISOString()
      default:
        return '2000-01-01'
    }
  }

  const chartData = selectedItemIds.map((itemId, index) => {
    const item = getItemById(itemId)
    const history = getPriceHistory(itemId)
    const filterDate = getDateRangeFilter()
    
    return {
      itemId,
      itemName: item?.name || itemId,
      points: history.filter(p => p.date >= filterDate),
      color: CHART_COLORS[index % CHART_COLORS.length]
    }
  })

  const handleExport = () => {
    const timestamp = new Date().toISOString()
    const exportData = {
      exportDate: timestamp,
      metricMode,
      dateRange,
      hourlyWage,
      items: selectedItemIds.map(id => ({
        id,
        name: getItemById(id)?.name,
        data: getPriceHistory(id)
      })),
      methodology: 'Hours of work calculated as: (price × quantity) ÷ hourly wage',
      sources: 'USDA AMS, EIA',
      hash: btoa(timestamp).slice(0, 16)
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `egl-comparison-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)

    toast.success('Export complete', {
      description: 'Data exported with source metadata and methodology'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Compare Items</h1>
        <p className="text-muted-foreground">
          Visualize price trends and affordability across time
        </p>
      </div>

      {selectedItemIds.length === 0 ? (
        <Card className="p-12 text-center">
          <Info size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No items selected</h3>
          <p className="text-muted-foreground mb-4">
            Add items from the Explore tab to start comparing
          </p>
        </Card>
      ) : (
        <>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <Label>Selected Items</Label>
                  <div className="flex gap-2 flex-wrap">
                    {selectedItemIds.map((itemId, index) => {
                      const item = getItemById(itemId)
                      return (
                        <Badge 
                          key={itemId}
                          className="pr-1"
                          style={{ 
                            backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                            color: 'white'
                          }}
                        >
                          {item?.name}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-2 hover:bg-white/20"
                            onClick={() => onRemoveItem(itemId)}
                          >
                            <X size={12} />
                          </Button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="space-y-2">
                    <Label>Metric Mode</Label>
                    <Select value={metricMode} onValueChange={(v) => setMetricMode(v as MetricMode)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nominal">Nominal ($)</SelectItem>
                        <SelectItem value="real">Real ($, CPI-adj)</SelectItem>
                        <SelectItem value="hours-of-work">Hours of Work</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Period</Label>
                    <Select value={dateRange} onValueChange={(v) => setDateRange(v as any)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1y">1 Year</SelectItem>
                        <SelectItem value="5y">5 Years</SelectItem>
                        <SelectItem value="10y">10 Years</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {metricMode === 'hours-of-work' && (
                <Card className="p-3 bg-accent/10 border-accent">
                  <p className="text-sm">
                    <span className="font-medium">Wage rate:</span> ${hourlyWage.toFixed(2)}/hour
                    <span className="text-muted-foreground ml-2">
                      (Change in Settings)
                    </span>
                  </p>
                </Card>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Price History</h2>
              <Button onClick={handleExport} variant="outline" size="sm">
                <Export size={16} className="mr-2" />
                Export Data
              </Button>
            </div>
            
            <PriceChart 
              data={chartData}
              metricMode={metricMode}
              hourlyWage={hourlyWage}
            />
          </Card>

          <Card className="p-4 bg-muted/50">
            <div className="flex items-start gap-2">
              <Info size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Formula Reference:</p>
                <ul className="space-y-1 font-mono text-xs">
                  <li>Nominal Price: Direct price in current dollars</li>
                  <li>Hours of Work: (Price × Quantity) ÷ Hourly Wage</li>
                  <li>Real Price: Nominal Price ÷ CPI Index (when available)</li>
                </ul>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
