import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, House, MagnifyingGlass, ChartLine, ChartLineUp, BookOpen, Database, Gear } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  selectedItemsCount: number
}

const navItems = [
  { id: 'home', label: 'Home', icon: House, description: 'Dashboard overview' },
  { id: 'explore', label: 'Explore', icon: MagnifyingGlass, description: 'Browse essential goods' },
  { id: 'compare', label: 'Compare', icon: ChartLine, description: 'Chart builder', badge: true },
  { id: 'analytics', label: 'Analytics', icon: ChartLineUp, description: 'Wage vs essentials' },
  { id: 'methodology', label: 'Methodology', icon: BookOpen, description: 'Formulas & sources' },
  { id: 'sources', label: 'Sources', icon: Database, description: 'API data refresh' },
  { id: 'settings', label: 'Settings', icon: Gear, description: 'Configure wage' },
]

export function MobileNav({ isOpen, onClose, activeTab, onTabChange, selectedItemsCount }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card border-r border-border z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                  <span className="text-primary-foreground font-bold font-mono text-sm">EGL</span>
                </div>
                <div>
                  <h2 className="font-display font-bold text-base leading-tight">
                    Essential Goods
                  </h2>
                  <p className="text-xs text-muted-foreground leading-tight">
                    Ledger
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-9 w-9 rounded-lg hover:bg-muted"
              >
                <X size={20} weight="bold" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeTab === item.id
                  const showBadge = item.badge && selectedItemsCount > 0
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={cn(
                          'w-full flex items-center gap-4 px-4 py-3.5 rounded-lg transition-all duration-200 group relative overflow-hidden',
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active-bg"
                            className="absolute inset-0 bg-primary rounded-lg"
                            initial={false}
                            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                          />
                        )}
                        
                        <div className="relative z-10 flex items-center gap-4 flex-1">
                          <Icon
                            size={22}
                            weight={isActive ? 'fill' : 'regular'}
                            className={cn(
                              'flex-shrink-0 transition-transform duration-200',
                              !isActive && 'group-hover:scale-110'
                            )}
                          />
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-[15px]">{item.label}</span>
                              {showBadge && (
                                <span className={cn(
                                  'px-2 py-0.5 rounded-full text-xs font-mono font-semibold',
                                  isActive 
                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                    : 'bg-accent text-accent-foreground'
                                )}>
                                  {selectedItemsCount}
                                </span>
                              )}
                            </div>
                            <p className={cn(
                              'text-xs mt-0.5',
                              isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            )}>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-border bg-muted/30">
              <div className="text-xs text-muted-foreground text-center space-y-1">
                <p className="font-medium">Evidence-driven affordability analysis</p>
                <p>Track essentials in dollars & hours of work</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
