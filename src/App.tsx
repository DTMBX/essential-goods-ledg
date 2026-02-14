import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { useKV } from '@github/spark/hooks'
import { AppHeader } from '@/components/AppHeader'
import { HomeView } from '@/components/HomeView'
import { ExploreView } from '@/components/ExploreView'
import { CompareView } from '@/components/CompareView'
import { SettingsView } from '@/components/SettingsView'
import { MethodologyView } from '@/components/MethodologyView'
import { AnalyticsView } from '@/components/AnalyticsView'
import type { UserWageConfig } from '@/lib/types'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'analytics') {
      setActiveTab('analytics')
    }
  }, [])
  
  const [wageConfig, setWageConfig] = useKV<UserWageConfig>('wage-config', {
    type: 'manual',
    hourlyWage: 15.00,
    region: 'US-National'
  })

  const [selectedItems, setSelectedItems] = useKV<string[]>('selected-items', [])

  const handleToggleItem = (itemId: string) => {
    setSelectedItems((current = []) => {
      if (current.includes(itemId)) {
        return current.filter(id => id !== itemId)
      }
      return [...current, itemId]
    })
  }

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems((current = []) => current.filter(id => id !== itemId))
  }

  const handleCompareItems = (itemIds: string[]) => {
    setSelectedItems(itemIds)
    setActiveTab('compare')
  }

  const handleExplore = () => {
    setActiveTab('explore')
  }

  const handleUpdateWage = (config: UserWageConfig) => {
    setWageConfig(config)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedItemsCount={selectedItems?.length || 0}
      />

      <main className="container mx-auto px-4 py-6 lg:py-8">
        {activeTab === 'home' && wageConfig && (
          <HomeView 
            wageConfig={wageConfig}
            onExplore={handleExplore}
            onCompare={handleCompareItems}
          />
        )}

        {activeTab === 'explore' && selectedItems && (
          <ExploreView
            selectedItemIds={selectedItems}
            onToggleItem={handleToggleItem}
            hourlyWage={wageConfig?.hourlyWage || 15}
          />
        )}

        {activeTab === 'compare' && selectedItems && (
          <CompareView
            selectedItemIds={selectedItems}
            onRemoveItem={handleRemoveItem}
            hourlyWage={wageConfig?.hourlyWage || 15}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}

        {activeTab === 'methodology' && (
          <MethodologyView />
        )}

        {activeTab === 'settings' && wageConfig && (
          <SettingsView
            wageConfig={wageConfig}
            onUpdateWage={handleUpdateWage}
          />
        )}
      </main>

      <Toaster />
    </div>
  )
}

export default App