import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowsClockwise, 
  CheckCircle, 
  XCircle, 
  Clock,
  Database,
  Link as LinkIcon,
  Info
} from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { SOURCES } from '@/lib/data'
import { 
  refreshDataSource, 
  refreshAllDataSources, 
  getTimeSinceRefresh,
  formatRefreshTimestamp,
  type RefreshMetadata,
  type DataRefreshStatus
} from '@/lib/data-refresh'
import { toast } from 'sonner'

export function DataSourcesView() {
  const [refreshMetadata, setRefreshMetadata] = useKV<RefreshMetadata>('data-refresh-metadata', {
    sources: {},
    lastGlobalRefresh: new Date().toISOString()
  })
  
  const [refreshingSource, setRefreshingSource] = useState<string | null>(null)
  const [refreshingAll, setRefreshingAll] = useState(false)

  const handleRefreshSource = async (sourceId: string) => {
    setRefreshingSource(sourceId)
    
    try {
      const result = await refreshDataSource(sourceId)
      
      setRefreshMetadata((current) => ({
        ...current!,
        sources: {
          ...current!.sources,
          [sourceId]: result
        }
      }))
      
      if (result.status === 'success') {
        toast.success('Data refreshed', {
          description: result.message
        })
      } else {
        toast.error('Refresh failed', {
          description: result.message
        })
      }
    } catch (error) {
      toast.error('Refresh failed', {
        description: 'An unexpected error occurred'
      })
    } finally {
      setRefreshingSource(null)
    }
  }

  const handleRefreshAll = async () => {
    setRefreshingAll(true)
    
    try {
      const result = await refreshAllDataSources(SOURCES)
      setRefreshMetadata(result)
      
      const successCount = Object.values(result.sources).filter(s => s.status === 'success').length
      const errorCount = Object.values(result.sources).filter(s => s.status === 'error').length
      
      if (errorCount === 0) {
        toast.success('All data sources refreshed', {
          description: `Successfully updated ${successCount} data sources`
        })
      } else {
        toast.warning('Refresh completed with errors', {
          description: `${successCount} succeeded, ${errorCount} failed`
        })
      }
    } catch (error) {
      toast.error('Refresh failed', {
        description: 'Failed to refresh data sources'
      })
    } finally {
      setRefreshingAll(false)
    }
  }

  const getSourceStatus = (sourceId: string): DataRefreshStatus | null => {
    return refreshMetadata?.sources[sourceId] || null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage API data source connections and refresh schedules
          </p>
        </div>
        <Button
          size="lg"
          onClick={handleRefreshAll}
          disabled={refreshingAll}
          className="gap-2"
        >
          <ArrowsClockwise 
            size={18} 
            className={refreshingAll ? 'animate-spin' : ''} 
          />
          {refreshingAll ? 'Refreshing...' : 'Refresh All'}
        </Button>
      </div>

      {refreshMetadata?.lastGlobalRefresh && (
        <Alert>
          <Clock size={16} />
          <AlertDescription>
            Last global refresh: {formatRefreshTimestamp(refreshMetadata.lastGlobalRefresh)}
            {' '}({getTimeSinceRefresh(refreshMetadata.lastGlobalRefresh)})
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {SOURCES.map(source => {
          const status = getSourceStatus(source.id)
          const isRefreshing = refreshingSource === source.id || refreshingAll
          
          return (
            <Card key={source.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Database size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1">{source.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {source.provider}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {source.license}
                        </Badge>
                        {status && (
                          <Badge 
                            variant={status.status === 'success' ? 'default' : status.status === 'error' ? 'destructive' : 'secondary'}
                            className="text-xs gap-1"
                          >
                            {status.status === 'success' && <CheckCircle size={12} weight="fill" />}
                            {status.status === 'error' && <XCircle size={12} weight="fill" />}
                            {status.status === 'refreshing' && <ArrowsClockwise size={12} className="animate-spin" />}
                            {status.status === 'success' && 'Connected'}
                            {status.status === 'error' && 'Error'}
                            {status.status === 'refreshing' && 'Refreshing'}
                            {status.status === 'idle' && 'Idle'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRefreshSource(source.id)}
                    disabled={isRefreshing}
                    className="gap-2 flex-shrink-0"
                  >
                    <ArrowsClockwise 
                      size={14} 
                      className={isRefreshing ? 'animate-spin' : ''} 
                    />
                    {isRefreshing ? 'Refreshing' : 'Refresh'}
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  {status?.lastRefresh && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} />
                      <span>
                        Last refresh: {getTimeSinceRefresh(status.lastRefresh)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LinkIcon size={14} />
                    <a 
                      href={source.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-foreground hover:underline truncate"
                    >
                      {source.url}
                    </a>
                  </div>
                  
                  {status?.message && (
                    <div className={`flex items-start gap-2 p-2 rounded ${
                      status.status === 'error' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-accent/10 text-accent-foreground'
                    }`}>
                      <Info size={14} className="flex-shrink-0 mt-0.5" />
                      <span className="text-xs">{status.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card className="p-6 bg-muted/50">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">About Data Sources</h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              All price and wage data is sourced from official U.S. government agencies and made 
              available under Public Domain licensing. Data is refreshed on-demand to ensure 
              you have access to the latest information.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong>USDA Agricultural Marketing Service:</strong> Provides commodity price 
                data for dairy, meat, and agricultural products
              </li>
              <li>
                <strong>U.S. Energy Information Administration:</strong> Tracks energy prices 
                including gasoline and propane
              </li>
              <li>
                <strong>Bureau of Labor Statistics:</strong> Publishes wage data, minimum wage 
                series, and Consumer Price Index (CPI)
              </li>
            </ul>
            <p className="pt-2">
              <strong>Data Integrity:</strong> All timestamps are preserved to maintain audit 
              trails. Raw source values are stored separately from normalized calculations.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
