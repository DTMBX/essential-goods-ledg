import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CategoryBadge } from '@/components/CategoryBadge'
import { MagnifyingGlass, Plus, Check } from '@phosphor-icons/react'
import { ITEMS, getLatestPrice, calculateHoursOfWork } from '@/lib/data'
import type { ItemCategory } from '@/lib/types'

interface ExploreViewProps {
  selectedItemIds: string[]
  onToggleItem: (itemId: string) => void
  hourlyWage: number
}

export function ExploreView({ selectedItemIds, onToggleItem, hourlyWage }: ExploreViewProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all')

  const categories: Array<ItemCategory | 'all'> = ['all', 'dairy', 'meat', 'fuel', 'household']

  const filteredItems = ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Explore Items</h1>
        <p className="text-muted-foreground">
          Search and select items to add to your comparison
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <MagnifyingGlass
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        {selectedItemIds.length > 0 && (
          <Card className="p-4 bg-accent/10 border-accent">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {selectedItemIds.length} item{selectedItemIds.length !== 1 ? 's' : ''} selected
                </p>
                <p className="text-sm text-muted-foreground">
                  Ready for comparison
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          const latest = getLatestPrice(item.id)
          const hoursOfWork = latest 
            ? calculateHoursOfWork(latest.nominalPrice, hourlyWage)
            : 0
          const isSelected = selectedItemIds.includes(item.id)

          return (
            <Card 
              key={item.id}
              className={`p-4 transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-accent' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.description}
                    </p>
                    <CategoryBadge category={item.category} />
                  </div>
                </div>

                {latest && (
                  <div className="space-y-1 pt-2 border-t">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono">
                        ${latest.nominalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{item.unit}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {hoursOfWork.toFixed(2)} hours of work
                    </div>
                  </div>
                )}

                <Button
                  variant={isSelected ? 'secondary' : 'default'}
                  size="sm"
                  className="w-full"
                  onClick={() => onToggleItem(item.id)}
                >
                  {isSelected ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Plus size={16} className="mr-2" />
                      Add to Compare
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-12 text-center">
          <MagnifyingGlass size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or category filter
          </p>
        </Card>
      )}
    </div>
  )
}
