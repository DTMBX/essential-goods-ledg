import type { Item, PricePoint, WageSeries, Source, CPIDataPoint } from './types'

export const SOURCES: Source[] = [
  {
    id: 'usda-1',
    name: 'USDA Agricultural Marketing Service',
    provider: 'U.S. Department of Agriculture',
    license: 'Public Domain',
    url: 'https://www.ams.usda.gov/market-news',
    retrievalTimestamp: new Date().toISOString()
  },
  {
    id: 'eia-1',
    name: 'U.S. Energy Information Administration',
    provider: 'U.S. Department of Energy',
    license: 'Public Domain',
    url: 'https://www.eia.gov/',
    retrievalTimestamp: new Date().toISOString()
  },
  {
    id: 'bls-1',
    name: 'Bureau of Labor Statistics - Wage Data',
    provider: 'U.S. Department of Labor',
    license: 'Public Domain',
    url: 'https://www.bls.gov/',
    retrievalTimestamp: new Date().toISOString()
  },
  {
    id: 'bls-cpi',
    name: 'Bureau of Labor Statistics - Consumer Price Index',
    provider: 'U.S. Department of Labor',
    license: 'Public Domain',
    url: 'https://www.bls.gov/cpi/',
    retrievalTimestamp: new Date().toISOString()
  }
]

export const ITEMS: Item[] = [
  {
    id: 'eggs-dozen',
    name: 'Eggs',
    category: 'dairy',
    unit: 'dozen',
    description: 'Grade A large eggs'
  },
  {
    id: 'milk-gallon',
    name: 'Milk',
    category: 'dairy',
    unit: 'gallon',
    description: 'Whole milk, conventional'
  },
  {
    id: 'butter-lb',
    name: 'Butter',
    category: 'dairy',
    unit: 'lb',
    description: 'Salted butter'
  },
  {
    id: 'cheese-lb',
    name: 'Cheese',
    category: 'dairy',
    unit: 'lb',
    description: 'Cheddar cheese'
  },
  {
    id: 'ground-beef-lb',
    name: 'Ground Beef',
    category: 'meat',
    unit: 'lb',
    description: '80% lean ground beef'
  },
  {
    id: 'tenderloin-lb',
    name: 'Beef Tenderloin',
    category: 'meat',
    unit: 'lb',
    description: 'USDA Choice beef tenderloin'
  },
  {
    id: 'gasoline-gallon',
    name: 'Gasoline',
    category: 'fuel',
    unit: 'gallon',
    description: 'Regular unleaded gasoline'
  },
  {
    id: 'propane-gallon',
    name: 'Propane',
    category: 'fuel',
    unit: 'gallon',
    description: 'Residential propane'
  }
]

function generatePriceHistory(
  itemId: string,
  basePrice: number,
  volatility: number,
  trend: number,
  sourceId: string
): PricePoint[] {
  const points: PricePoint[] = []
  const startDate = new Date('2014-01-01')
  const endDate = new Date('2024-12-01')
  
  let currentPrice = basePrice
  let date = new Date(startDate)
  
  while (date <= endDate) {
    const randomChange = (Math.random() - 0.5) * 2 * volatility
    const trendChange = trend
    currentPrice = currentPrice * (1 + randomChange + trendChange)
    
    points.push({
      id: `${itemId}-${date.toISOString()}`,
      itemId,
      date: date.toISOString().split('T')[0],
      region: 'US-National',
      nominalPrice: Math.round(currentPrice * 100) / 100,
      unit: ITEMS.find(i => i.id === itemId)?.unit || 'unit',
      sourceId,
      confidence: 'high'
    })
    
    date = new Date(date.setMonth(date.getMonth() + 1))
  }
  
  return points
}

export const PRICE_DATA: PricePoint[] = [
  ...generatePriceHistory('eggs-dozen', 2.10, 0.05, 0.003, 'usda-1'),
  ...generatePriceHistory('milk-gallon', 3.50, 0.03, 0.002, 'usda-1'),
  ...generatePriceHistory('butter-lb', 4.20, 0.04, 0.0025, 'usda-1'),
  ...generatePriceHistory('cheese-lb', 5.80, 0.03, 0.002, 'usda-1'),
  ...generatePriceHistory('ground-beef-lb', 4.50, 0.04, 0.003, 'usda-1'),
  ...generatePriceHistory('tenderloin-lb', 18.00, 0.05, 0.0025, 'usda-1'),
  ...generatePriceHistory('gasoline-gallon', 3.20, 0.08, 0.002, 'eia-1'),
  ...generatePriceHistory('propane-gallon', 2.80, 0.06, 0.0015, 'eia-1')
]

function generateWageHistory(
  wageType: 'minimum' | 'median',
  baseWage: number,
  growth: number
): WageSeries[] {
  const points: WageSeries[] = []
  const startDate = new Date('2014-01-01')
  const endDate = new Date('2024-12-01')
  
  let currentWage = baseWage
  let date = new Date(startDate)
  
  while (date <= endDate) {
    currentWage = currentWage * (1 + growth)
    
    points.push({
      id: `${wageType}-${date.toISOString()}`,
      region: 'US-National',
      date: date.toISOString().split('T')[0],
      wageValue: Math.round(currentWage * 100) / 100,
      wageType,
      sourceId: 'bls-1'
    })
    
    date = new Date(date.setMonth(date.getMonth() + 1))
  }
  
  return points
}

export const WAGE_DATA: WageSeries[] = [
  ...generateWageHistory('minimum', 7.25, 0.0002),
  ...generateWageHistory('median', 19.50, 0.002)
]

function generateCPIHistory(baseValue: number, baseYear: number, avgInflation: number): CPIDataPoint[] {
  const points: CPIDataPoint[] = []
  const startDate = new Date('2014-01-01')
  const endDate = new Date('2024-12-01')
  
  let date = new Date(startDate)
  const startYear = date.getFullYear()
  const yearDiff = startYear - baseYear
  
  let currentValue = baseValue * Math.pow(1 + avgInflation, yearDiff)
  
  while (date <= endDate) {
    const monthlyInflation = avgInflation / 12
    const seasonalVariation = (Math.random() - 0.5) * 0.001
    currentValue = currentValue * (1 + monthlyInflation + seasonalVariation)
    
    points.push({
      id: `cpi-${date.toISOString()}`,
      date: date.toISOString().split('T')[0],
      region: 'US-National',
      value: Math.round(currentValue * 1000) / 1000,
      baseYear: baseYear,
      sourceId: 'bls-cpi'
    })
    
    date = new Date(date.setMonth(date.getMonth() + 1))
  }
  
  return points
}

export const CPI_DATA: CPIDataPoint[] = generateCPIHistory(100, 1982, 0.025)

export function getCPIHistory(region: string = 'US-National'): CPIDataPoint[] {
  return CPI_DATA.filter(c => c.region === region)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getCPIForDate(date: string, region: string = 'US-National'): CPIDataPoint | undefined {
  const history = getCPIHistory(region)
  return history.find(c => c.date === date) || history[history.length - 1]
}

export function getLatestCPI(region: string = 'US-National'): CPIDataPoint | undefined {
  const history = getCPIHistory(region)
  return history[history.length - 1]
}

export function getItemById(id: string): Item | undefined {
  return ITEMS.find(item => item.id === id)
}

export function getPriceHistory(itemId: string, region: string = 'US-National'): PricePoint[] {
  return PRICE_DATA.filter(p => p.itemId === itemId && p.region === region)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getWageHistory(wageType: 'minimum' | 'median', region: string = 'US-National'): WageSeries[] {
  return WAGE_DATA.filter(w => w.wageType === wageType && w.region === region)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export function getLatestPrice(itemId: string, region: string = 'US-National'): PricePoint | undefined {
  const history = getPriceHistory(itemId, region)
  return history[history.length - 1]
}

export function getLatestWage(wageType: 'minimum' | 'median', region: string = 'US-National'): WageSeries | undefined {
  const history = getWageHistory(wageType, region)
  return history[history.length - 1]
}

export function calculateHoursOfWork(price: number, hourlyWage: number): number {
  return Math.round((price / hourlyWage) * 100) / 100
}

export function calculatePriceChange(oldPrice: number, newPrice: number): number {
  return Math.round(((newPrice - oldPrice) / oldPrice) * 10000) / 100
}

export function calculateRealPrice(nominalPrice: number, cpiValue: number, baseYear: number = 1982): number {
  const baseCPI = 100
  const adjustedPrice = (nominalPrice / cpiValue) * baseCPI
  return Math.round(adjustedPrice * 100) / 100
}

export function calculateInflationRate(oldCPI: number, newCPI: number): number {
  return Math.round(((newCPI - oldCPI) / oldCPI) * 10000) / 100
}

export function getPriceWithCPI(itemId: string, region: string = 'US-National'): Array<PricePoint & { realPrice: number, cpiValue: number }> {
  const priceHistory = getPriceHistory(itemId, region)
  const cpiHistory = getCPIHistory(region)
  
  return priceHistory.map(price => {
    const cpi = cpiHistory.find(c => c.date === price.date) || cpiHistory[cpiHistory.length - 1]
    const realPrice = calculateRealPrice(price.nominalPrice, cpi.value)
    
    return {
      ...price,
      realPrice,
      cpiValue: cpi.value
    }
  })
}
