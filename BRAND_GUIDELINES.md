# Chronos Brand Guidelines

## Overview

**Chronos** is a generational economic insights platform that helps Americans of all ages explore long-term price trends, wage growth, and volatility through transparent data visualization. The name "Chronos" evokes time, continuity, and the passage of economic history across generations.

## Brand Identity

### Name
**Chronos** - From the Greek god of time, representing:
- **Generational continuity** - Tracking economic experiences across decades
- **Historical perspective** - Long-term timeline analysis (1950-present)
- **Temporal measurement** - "Hours of work" affordability metrics
- **Transparency** - Clear, time-stamped data provenance

### Tagline
**Generational Economic Insights**

### Brand Promise
Building shared understanding across generations through transparent data exploration rather than blame or division.

---

## Logo

### Primary Mark

The Chronos logo features an abstract representation of generational continuity and economic flow:

- **Dual curved paths** - Symbolizing two generations side by side
- **Central connection point** - The shared economic present where generations meet
- **Horizontal baseline** - The timeline/foundation of historical data
- **Directional arrows** - Looking back (historical analysis) and forward (understanding)
- **Circular frame** - Unity, completeness, cyclical economic patterns

### Logo Usage

```tsx
import { Logo } from '@/components/Logo'

// Default usage
<Logo size={40} className="text-primary" />

// Large format
<Logo size={64} className="text-primary" />

// Monochrome
<Logo size={40} className="text-foreground" />
```

**Minimum Size:** 24px × 24px  
**Clear Space:** Maintain padding equal to 25% of logo height on all sides  
**Colors:** Use primary brand color or monochrome (foreground/white)

---

## Icon System

### Design Principles

1. **Geometric Foundation** - Built on a 24×24px grid with consistent stroke weights
2. **Three Weight Variants** - Thin (1.5px), Regular (2px), Bold (2.5px)
3. **Meaningful Symbolism** - Each icon directly represents its function
4. **Optical Balance** - Visual weight adjusted for perceived consistency
5. **Scalable** - Clean rendering from 16px to 64px

### Icon Categories

#### Navigation Icons
- **Home** - Dashboard with door entry
- **Explore** - Magnifying glass with plus (discover items)
- **Compare** - Side-by-side bars (chart comparison)
- **Analytics** - Line chart with data points
- **Settings** - Gear with adjustment indicators

#### Feature Icons
- **Timeline** - Horizontal arrow with milestone dots
- **Generations** - Overlapping figures representing cohorts
- **Affordability** - Clock face with directional arrows (time = work hours)
- **Volatility** - Fluctuating line with stability bands
- **Basket** - Shopping basket with essential goods
- **Insight** - Lightbulb with information marker
- **Education** - Graduation cap with book pages
- **Dialogue** - Speech bubble with text lines

#### Data & Source Icons
- **DataSource** - Database stack with refresh indicator
- **Methodology** - Document with formula notation
- **Refresh** - Circular arrow indicating update
- **Verified** - Shield with checkmark (credible source)
- **Warning** - Alert triangle (data gap/uncertainty)

#### Action Icons
- **Share** - Connected nodes (permalink sharing)
- **Export** - Upward arrow from box (download)
- **Filter** - Sliders with adjustment dots
- **Calendar** - Date grid with marked days

#### Indicator Icons
- **TrendUp** - Rising arrow (price increase)
- **TrendDown** - Falling arrow (price decrease)
- **Clock** - Time measurement (hours of work)

### Icon Usage

```tsx
import { AnalyticsIcon, TrendUpIcon } from '@/components/icons'

// Regular weight (default)
<AnalyticsIcon size={24} weight="regular" />

// Bold weight (active state)
<AnalyticsIcon size={24} weight="bold" className="text-primary" />

// Thin weight (muted state)
<AnalyticsIcon size={24} weight="thin" className="text-muted-foreground" />

// Semantic colors
<TrendUpIcon size={18} className="text-increase" />
<TrendDownIcon size={18} className="text-decrease" />
<VerifiedIcon size={18} className="text-accent" />
<WarningIcon size={18} className="text-destructive" />
```

---

## Color System

### Primary Palette

- **Primary:** `oklch(0.45 0.15 250)` - Deep blue-violet
  - Authority, trustworthiness, analytical
  - Use for: Primary actions, active states, key metrics
  
- **Accent:** `oklch(0.65 0.20 140)` - Vibrant teal
  - Highlighting, discovery, important data points
  - Use for: Selections, active elements, call-to-action

- **Secondary:** `oklch(0.85 0.01 60)` - Warm gray
  - Supporting UI elements
  - Use for: Secondary buttons, inactive states

### Semantic Colors

- **Increase:** `oklch(0.50 0.15 140)` - Muted green (neutral, not celebratory)
- **Decrease:** `oklch(0.55 0.18 25)` - Amber-orange (neutral warning)
- **Destructive:** `oklch(0.55 0.20 25)` - Warm red (errors, alerts)

### Data Visualization Palette

Sequential, perceptually uniform colors for multi-series charts:

- **Chart 1:** `oklch(0.55 0.22 250)` - Strong blue (primary series)
- **Chart 2:** `oklch(0.62 0.20 30)` - Warm amber (comparison)
- **Chart 3:** `oklch(0.58 0.18 160)` - Fresh green
- **Chart 4:** `oklch(0.50 0.15 320)` - Plum
- **Chart 5:** `oklch(0.48 0.12 200)` - Steel blue

### Accessibility

All color pairings meet WCAG AA contrast requirements (4.5:1 minimum):
- Background → Foreground: 13.2:1 ✓
- Primary → White text: 8.1:1 ✓
- Accent → Dark text: 6.8:1 ✓
- Muted → Dark text: 11.5:1 ✓

---

## Typography

### Font Stack

#### Display & Headings
**Space Grotesk** - Geometric sans with distinctive character
- Strong presence for section headers and dashboard headlines
- Bold weight for primary headings, SemiBold for subheadings
- Tight letter-spacing (-0.02em to -0.01em) for visual impact

#### Body & UI
**IBM Plex Sans** - Designed for UI with technical heritage
- Excellent readability at small sizes
- Fits the data-tool aesthetic
- Regular weight for most UI text

#### Data & Monospace
**JetBrains Mono** - Code-style font for precise displays
- Numeric displays, formulas, source citations
- Tabular figures for data alignment
- Medium and Bold weights for emphasis

### Type Scale

```
H1 (Dashboard Title): Space Grotesk Bold / 32px / -0.02em / line-height 1.1
H2 (Section Headers): Space Grotesk SemiBold / 24px / -0.01em / line-height 1.2
H3 (Card Titles): Space Grotesk Medium / 18px / 0 / line-height 1.3
Body (Primary): IBM Plex Sans Regular / 15px / 0 / line-height 1.6
Small (Metadata): IBM Plex Sans Regular / 13px / 0 / line-height 1.5
Data Labels: JetBrains Mono Medium / 14px / 0 / line-height 1.4
Large Metrics: JetBrains Mono Bold / 28px / -0.01em / line-height 1.1
```

---

## Voice & Tone

### Brand Voice

**Educational** - Explains complex economic concepts clearly  
**Neutral** - Avoids political framing or blame  
**Transparent** - Shows all formulas, sources, and limitations  
**Empathetic** - Acknowledges different generational experiences  
**Rigorous** - Every claim backed by cited data

### Content Guidelines

✅ **DO:**
- Use "How did affordability differ between 1975 and 2005?"
- Present observed data patterns objectively
- Separate "What the data shows" from "What it doesn't show"
- Cite credible sources (NBER, Federal Reserve, BLS, academic)
- Label assumptions and methodology explicitly

❌ **DON'T:**
- Attribute intent to unnamed actors
- Present unverified claims as fact
- Use accusatory framing or blame language
- Mix interpretation with raw data
- Make predictions without disclaimers

---

## Design Patterns

### Cards
Primary container pattern with subtle borders, rounded corners (0.5rem), and shadow on hover

### Data Visualization
- Clean axes with clear labels and units
- Muted gridlines (30% opacity)
- Interactive hover states highlighting series
- Formula tooltips on all derived metrics
- "What it shows / doesn't show" guardrails

### Loading States
Skeleton screens with subtle pulse animation (no spinners)

### Status Indicators
- Color + icon + text (never color alone for accessibility)
- Verified sources: Accent color + VerifiedIcon
- Data gaps: Destructive + WarningIcon
- Neutral trends: Muted colors for increase/decrease

---

## Implementation

### Viewing the Icon System

Visit the icon showcase to see all icons in context:

```tsx
// In your browser, navigate to:
/#icons

// Or programmatically:
onTabChange('icons')
```

### Component Imports

```tsx
// Logo
import { Logo } from '@/components/Logo'

// Icons
import { 
  AnalyticsIcon, 
  GenerationsIcon, 
  AffordabilityIcon 
} from '@/components/icons'

// Usage in navigation
<AnalyticsIcon size={18} weight="bold" className="text-primary" />
```

---

## Brand Evolution

**Version:** 1.0  
**Date:** 2024  
**Status:** Active

### Future Considerations
- Animated logo variant for loading states
- Extended icon set for new features (utilities, rent, regional analysis)
- Print/PDF export templates with brand system
- Educator materials kit with branded templates

---

## Contact & Questions

For brand usage questions or custom implementation needs, refer to the PRD.md for product direction and component documentation for technical implementation.

**Remember:** Every design decision should reinforce transparency, build trust, and foster cross-generational understanding.
