import type { Source } from './types'

export interface DataRefreshStatus {
  lastRefresh: string
  status: 'idle' | 'refreshing' | 'success' | 'error'
  message?: string
  sourceId: string
}

export interface RefreshMetadata {
  sources: Record<string, DataRefreshStatus>
  lastGlobalRefresh: string
}

export async function refreshDataSource(sourceId: string): Promise<DataRefreshStatus> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date().toISOString()
      const success = Math.random() > 0.1
      
      resolve({
        lastRefresh: now,
        status: success ? 'success' : 'error',
        message: success 
          ? `Successfully retrieved data from ${sourceId}` 
          : `Failed to connect to ${sourceId} API endpoint`,
        sourceId
      })
    }, 1500 + Math.random() * 1000)
  })
}

export async function refreshAllDataSources(sources: Source[]): Promise<RefreshMetadata> {
  const results = await Promise.allSettled(
    sources.map(source => refreshDataSource(source.id))
  )
  
  const sourceStatuses: Record<string, DataRefreshStatus> = {}
  
  results.forEach((result, index) => {
    const sourceId = sources[index].id
    if (result.status === 'fulfilled') {
      sourceStatuses[sourceId] = result.value
    } else {
      sourceStatuses[sourceId] = {
        lastRefresh: new Date().toISOString(),
        status: 'error',
        message: 'Refresh failed unexpectedly',
        sourceId
      }
    }
  })
  
  return {
    sources: sourceStatuses,
    lastGlobalRefresh: new Date().toISOString()
  }
}

export function getTimeSinceRefresh(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diffMs = now - then
  
  const diffMinutes = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  
  return new Date(timestamp).toLocaleDateString()
}

export function formatRefreshTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}
