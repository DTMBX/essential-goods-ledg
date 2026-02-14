export type ItemCategory = 'dairy' | 'meat' | 'fuel' | 'household'

export interface Item {
  id: string
  name: string
  category: ItemCategory
  unit: string
  description?: string
}

export interface PricePoint {
  id: string
  itemId: string
  date: string
  region: string
  nominalPrice: number
  unit: string
  sourceId: string
  confidence: 'high' | 'medium' | 'low'
}

export interface WageSeries {
  id: string
  region: string
  date: string
  wageValue: number
  wageType: 'minimum' | 'median' | 'sector' | 'user'
  sourceId?: string
  effectiveDate?: string
  jurisdiction?: 'federal' | 'state' | 'city'
}

export interface CPIDataPoint {
  id: string
  date: string
  region: string
  value: number
  baseYear: number
  sourceId: string
}

export interface Source {
  id: string
  name: string
  provider: string
  license: string
  url: string
  retrievalTimestamp: string
}

export interface Basket {
  id: string
  name: string
  items: Array<{
    itemId: string
    quantity: number
  }>
}

export interface UserWageConfig {
  type: 'manual' | 'sourced'
  hourlyWage?: number
  sourcedSeriesId?: string
  region: string
}

export type MetricMode = 'nominal' | 'real' | 'hours-of-work'

export interface ComparisonConfig {
  itemIds: string[]
  dateRange: {
    start: string
    end: string
  }
  metricMode: MetricMode
  region: string
}

export interface WageIncreaseEvent {
  effectiveDate: string
  oldWage: number
  newWage: number
  increase: number
  increasePercent: number
  region: string
  jurisdiction: 'federal' | 'state' | 'city'
}

export interface AffordabilityMetrics {
  itemId: string
  itemName: string
  hoursT1: number
  hoursT2: number
  affordabilityRatio: number
  absoluteChange: number
  percentChange: number
  nominalGrowth: number
  wageGrowth: number
  relativeOutpacing: number
}

export interface BasketAffordabilityMetrics {
  basketCostT1: number
  basketCostT2: number
  hoursT1: number
  hoursT2: number
  affordabilityRatio: number
  absoluteChange: number
  percentChange: number
  nominalGrowth: number
  wageGrowth: number
  relativeOutpacing: number
  verdict: 'kept-up' | 'lagged' | 'unclear'
  confidenceLevel: 'high' | 'medium' | 'low'
}

export interface AnalyticsConfig {
  region: string
  dateRange: {
    start: string
    end: string
  }
  baseDate: string
  wageType: 'minimum' | 'median'
  basketItemIds: string[]
  metricMode: MetricMode
  verdictThreshold: number
  eventWindowMonths: number
}
