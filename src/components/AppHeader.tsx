import { useState } from 'react'
import { List } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { MobileNav } from '@/components/MobileNav'
import { DesktopNav } from '@/components/DesktopNav'
import { useIsMobile } from '@/hooks/use-mobile'

interface AppHeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
  selectedItemsCount: number
}

export function AppHeader({ activeTab, onTabChange, selectedItemsCount }: AppHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      <header className="border-b bg-card/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <div className="flex items-center gap-3 min-w-0">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileNavOpen(true)}
                  className="flex-shrink-0 h-10 w-10 rounded-lg hover:bg-muted lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <List size={24} weight="bold" />
                </Button>
              )}
              
              <button
                onClick={() => onTabChange('home')}
                className="flex items-center gap-2.5 min-w-0 group"
              >
                <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-primary flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
                  <span className="text-primary-foreground font-bold font-mono text-xs lg:text-sm">
                    EGL
                  </span>
                </div>
                <div className="min-w-0 hidden sm:block">
                  <h1 className="font-display font-bold text-base lg:text-lg leading-tight truncate">
                    Essential Goods Ledger
                  </h1>
                  <p className="text-xs text-muted-foreground leading-tight hidden lg:block">
                    Evidence-driven affordability analysis
                  </p>
                </div>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <DesktopNav
                activeTab={activeTab}
                onTabChange={onTabChange}
                selectedItemsCount={selectedItemsCount}
              />
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        activeTab={activeTab}
        onTabChange={onTabChange}
        selectedItemsCount={selectedItemsCount}
      />
    </>
  )
}
