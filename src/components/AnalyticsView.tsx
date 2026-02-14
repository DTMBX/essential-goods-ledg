import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ChartLine, Table, Calendar, FileText } from '@phosphor-icons/react'
import { AffordabilityDashboard } from '@/components/AffordabilityDashboard'
import { OutpacingRankings } from '@/components/OutpacingRankings'
import { EventStudyView } from '@/components/EventStudyView'
import { AnalyticsMethodology } from '@/components/AnalyticsMethodology'
import { ITEMS } from '@/lib/data'
import type { AnalyticsConfig, MetricMode } from '@/lib/types'

interface AnalyticsViewProps {
  initialConfig?: Partial<AnalyticsConfig>
}

export function AnalyticsView({ initialConfig }: AnalyticsViewProps) {
  const defaultEndDate = new Date().toISOString().split('T')[0]
  const defaultStartDate = new Date(Date.now() - 365 * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  
  const [config, setConfig] = useState<AnalyticsConfig>({
    region: initialConfig?.region || 'US-National',
    dateRange: {
      start: initialConfig?.dateRange?.start || defaultStartDate,
      end: initialConfig?.dateRange?.end || defaultEndDate
    },
    baseDate: initialConfig?.baseDate || defaultStartDate,
    wageType: initialConfig?.wageType || 'minimum',
    basketItemIds: initialConfig?.basketItemIds || ITEMS.map(i => i.id),
    metricMode: initialConfig?.metricMode || 'hours-of-work',
    verdictThreshold: initialConfig?.verdictThreshold || 1.00,
    eventWindowMonths: initialConfig?.eventWindowMonths || 3
  })

  const handleConfigChange = (updates: Partial<AnalyticsConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const handleDateRangePreset = (preset: '1y' | '3y' | '5y' | '10y' | 'all') => {
    const endDate = new Date()
    let startDate = new Date()
    
    switch (preset) {
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
      case '3y':
        startDate.setFullYear(endDate.getFullYear() - 3)
        break
      case '5y':
        startDate.setFullYear(endDate.getFullYear() - 5)
        break
      case '10y':
        startDate.setFullYear(endDate.getFullYear() - 10)
        break
      case 'all':
        startDate = new Date('2014-01-01')
        break
    }
    
    handleConfigChange({
      dateRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0]
      },
      baseDate: startDate.toISOString().split('T')[0]
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold mb-2">Wage vs Essentials Analytics</h1>
        <p className="text-muted-foreground">
          Quantifying whether minimum wage increases keep up with essential-goods inflation
        </p>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Region</label>
            <Select 
              value={config.region} 
              onValueChange={(value) => handleConfigChange({ region: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US-National">US - National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Wage Type</label>
            <Select 
              value={config.wageType} 
              onValueChange={(value: 'minimum' | 'median') => handleConfigChange({ wageType: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minimum">Minimum Wage</SelectItem>
                <SelectItem value="median">Median Wage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Metric Mode</label>
            <Select 
              value={config.metricMode} 
              onValueChange={(value: MetricMode) => handleConfigChange({ metricMode: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nominal">Nominal ($)</SelectItem>
                <SelectItem value="real">Real ($, CPI-adj)</SelectItem>
                <SelectItem value="hours-of-work">Hours of Work</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Time Period</label>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDateRangePreset('1y')}
              >
                1Y
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDateRangePreset('3y')}
              >
                3Y
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDateRangePreset('5y')}
              >
                5Y
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleDateRangePreset('10y')}
              >
                10Y
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="dashboard" className="gap-2">
            <ChartLine size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="rankings" className="gap-2">
            <Table size={16} />
            <span className="hidden sm:inline">Rankings</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="gap-2">
            <Calendar size={16} />
            <span className="hidden sm:inline">Events</span>
          </TabsTrigger>
          <TabsTrigger value="methodology" className="gap-2">
            <FileText size={16} />
            <span className="hidden sm:inline">Methodology</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          <AffordabilityDashboard config={config} />
        </TabsContent>

        <TabsContent value="rankings" className="mt-6">
          <OutpacingRankings config={config} />
        </TabsContent>

        <TabsContent value="events" className="mt-6">
          <EventStudyView config={config} onConfigChange={handleConfigChange} />
        </TabsContent>

        <TabsContent value="methodology" className="mt-6">
          <AnalyticsMethodology config={config} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
