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

export type RefreshSchedule = 'manual' | 'hourly' | 'daily' | 'disabled'

export interface RefreshScheduleConfig {
  enabled: boolean
  schedule: RefreshSchedule
  lastScheduledRefresh?: string
  nextScheduledRefresh?: string
  autoRefreshEnabled: boolean
}

export interface SourceRefreshSchedule {
  sourceId: string
  schedule: RefreshSchedule
  enabled: boolean
}

export type Generation = 'silent' | 'boomer' | 'genx' | 'millennial' | 'genz'

export interface GenerationDefinition {
  id: Generation
  name: string
  birthYearStart: number
  birthYearEnd: number
  description: string
  color: string
}

export interface VolatilityMetrics {
  date: string
  value: number
  volatilityWindow: 3 | 5 | 10
  metric: 'price' | 'wage' | 'basket' | 'cpi'
  itemId?: string
}

export interface EconomicEvent {
  id: string
  name: string
  date: string
  endDate?: string
  type: 'recession' | 'policy' | 'shock' | 'crisis' | 'other'
  description: string
  citation: string
  citationUrl: string
  source: string
}

export interface AffordabilityByAge {
  generation: Generation
  birthYear: number
  age: number
  calendarYear: number
  basketHours: number
  wage: number
  basketCost: number
  interpolated: boolean
}

export interface DialoguePrompt {
  id: string
  category: 'affordability' | 'volatility' | 'wages' | 'general'
  question: string
  context: string
  relatedChartIds: string[]
  educatorNotes?: string
}

export interface DataGuardrails {
  chartId: string
  whatDataShows: string[]
  whatDataDoesNotShow: string[]
  assumptions: string[]
  limitations: string[]
  interpretivePerspectives?: Array<{
    label: string
    content: string
    isOpinion: boolean
  }>
}

export interface VolatilityConfig {
  enabled: boolean
  window: 3 | 5 | 10
  showBands: boolean
  smoothingMethod: 'none' | 'moving-average' | 'exponential'
}

export interface GenerationalConfig {
  selectedGenerations: Generation[]
  compareMode: 'timeline' | 'life-stage' | 'calendar-year'
  lifeStages: number[]
  showVolatility: boolean
  showEvents: boolean
}

export interface DecadeComparison {
  decade: string
  startYear: number
  endYear: number
  medianWage: number
  basketCost: number
  basketHours: number
  cpiAverage: number
  volatilityAverage: number
  coverage: number
}

export interface EconomicLearningModule {
  id: string
  title: string
  category: 'cycles' | 'inflation' | 'monetary-policy' | 'supply-shocks' | 'media'
  content: string
  readingLevel: number
  citations: Array<{
    text: string
    url: string
    source: string
  }>
  relatedTerms: string[]
  visualAid?: string
}
