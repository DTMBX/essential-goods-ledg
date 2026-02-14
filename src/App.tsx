import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { useKV } from '@github/spark/hooks'
import { HomeView } from '@/components/HomeView'
import { ExploreView } from '@/components/ExploreView'
import { CompareView } from '@/components/CompareView'
import { SettingsView } from '@/components/SettingsView'
import { MethodologyView } from '@/components/MethodologyView'
import { House, MagnifyingGlass, ChartLine, Gear, BookOpen } from '@phosphor-icons/react'
import type { UserWageConfig } from '@/lib/types'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  
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
      <div className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold font-mono">EGL</span>
              </div>
              <span className="font-display font-bold text-lg hidden sm:inline">
                Essential Goods Ledger
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full sm:w-auto">
            <TabsTrigger value="home" className="gap-2">
              <House size={16} />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="explore" className="gap-2">
              <MagnifyingGlass size={16} />
              <span className="hidden sm:inline">Explore</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="gap-2">
              <ChartLine size={16} />
              <span className="hidden sm:inline">Compare</span>
              {selectedItems && selectedItems.length > 0 && (
                <span className="ml-1 bg-accent text-accent-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {selectedItems.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="methodology" className="gap-2">
              <BookOpen size={16} />
              <span className="hidden sm:inline">Methodology</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Gear size={16} />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            {wageConfig && (
              <HomeView 
                wageConfig={wageConfig}
                onExplore={handleExplore}
                onCompare={handleCompareItems}
              />
            )}
          </TabsContent>

          <TabsContent value="explore">
            {selectedItems && (
              <ExploreView
                selectedItemIds={selectedItems}
                onToggleItem={handleToggleItem}
                hourlyWage={wageConfig?.hourlyWage || 15}
              />
            )}
          </TabsContent>

          <TabsContent value="compare">
            {selectedItems && (
              <CompareView
                selectedItemIds={selectedItems}
                onRemoveItem={handleRemoveItem}
                hourlyWage={wageConfig?.hourlyWage || 15}
              />
            )}
          </TabsContent>

          <TabsContent value="methodology">
            <MethodologyView />
          </TabsContent>

          <TabsContent value="settings">
            {wageConfig && (
              <SettingsView
                wageConfig={wageConfig}
                onUpdateWage={handleUpdateWage}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Toaster />
    </div>
  )
}

export default App