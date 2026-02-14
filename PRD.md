# Essential Goods Ledger

A cross-platform evidence-visualization tool that tracks everyday necessities over time and expresses cost in both dollars and "hours of work," helping users understand affordability shifts and inflation dynamics through transparent, defensible data.

**Experience Qualities**:
1. **Transparent**: Every number traces back to its source with timestamps and formulas exposed, building trust through radical openness
2. **Empowering**: Users discover affordability patterns themselves through interactive exploration rather than being told what to think
3. **Rigorous**: Academic-grade methodology paired with accessible visuals, suitable for both household budgeting and published research

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a data-intensive application with sophisticated time-series visualization, multi-dimensional comparisons, configurable wage scenarios, export capabilities with audit trails, and role-based access. It requires multiple coordinated views (dashboard, chart builder, methodology, sources) and complex state management for filters, baskets, and comparison configurations.

## Essential Features

### Home Dashboard - Basket Snapshot
- **Functionality**: Displays a curated basket of essential goods (eggs, milk, butter, cheese, ground beef, tenderloin, gasoline, propane) with current prices and affordability metrics
- **Purpose**: Provides an immediate, visceral understanding of purchasing power through the "hours of work" headline metric
- **Trigger**: User opens the application or navigates to home
- **Progression**: App loads → Shows basket items with current prices → Calculates hours-of-work for basket → Displays trend indicators (↑↓) → User can click any item to explore deeper
- **Success criteria**: Basket loads in <2s, hours-of-work calculation is transparent (shows wage source), and trend indicators accurately reflect change over selected timeframe

### Explore - Item Catalog
- **Functionality**: Searchable, filterable catalog of tracked goods organized by category (dairy, meat, fuel, household) with unit normalization
- **Purpose**: Allows users to discover and select specific items for deeper analysis
- **Trigger**: User clicks "Explore" or searches for a specific item
- **Progression**: Navigate to Explore → View categories → Search/filter items → Select item → View price history card → Add to comparison or save to basket
- **Success criteria**: Search returns results in <500ms, categories are logically organized, units are clearly displayed, and users can add items to comparisons with one click

### Compare - Multi-Series Chart Builder
- **Functionality**: Interactive chart builder supporting multiple items, date ranges, and metric modes (nominal $, CPI-adjusted real $, hours-of-work)
- **Purpose**: Core analytical tool for comparing affordability across goods and time periods with inflation-adjusted purchasing power analysis
- **Trigger**: User selects "Compare" or adds items from Explore
- **Progression**: Select items → Choose date range → Pick metric mode (nominal/real/hours) → View chart → Adjust scale/zoom → Export or save configuration
- **Success criteria**: Charts render smoothly with 10+ years of data, metric switching is instant (including CPI calculations), formula tooltips explain calculations, and exports include complete source metadata including CPI values

### CPI Integration & Real Price Calculation
- **Functionality**: Automatic inflation adjustment using Bureau of Labor Statistics Consumer Price Index data (base year 1982-84 = 100)
- **Purpose**: Enables users to separate item-specific price changes from general inflation effects
- **Trigger**: User selects "Real ($, CPI-adj)" metric mode in comparison view
- **Progression**: Select real price mode → System retrieves CPI data for date range → Calculates (nominal_price ÷ CPI_value) × 100 for each data point → Charts display inflation-adjusted prices → Tooltips show both nominal and real values
- **Success criteria**: CPI calculations are accurate and traceable to BLS source, chart axes clearly indicate "1982-84 dollars", methodology documentation explains adjustment formula, and exports include both nominal and real values with CPI series data

### Wage Configuration
- **Functionality**: Set hourly wage from user input or select from sourced series (minimum wage, median earnings, sector wages)
- **Purpose**: Personalizes affordability calculations to user's economic reality
- **Trigger**: First-time setup prompt or user navigates to settings
- **Progression**: Open wage config → Choose input method (manual/sourced) → Enter value or select series → Set region → Apply → See updated hours-of-work metrics
- **Success criteria**: Wage source is always visible on charts, multiple scenarios can be compared side-by-side, salary-to-hourly conversion is transparent

### Methodology & Sources
- **Functionality**: Comprehensive documentation of formulas, data sources, API provenance, licensing, and known limitations
- **Purpose**: Establishes credibility and allows users to audit calculations
- **Trigger**: User clicks methodology links or info icons throughout app
- **Progression**: View methodology → Read formulas → Check source list → See retrieval timestamps → Understand confidence levels → Return to analysis
- **Success criteria**: Every formula has a clear explanation, every data point traces to a source, limitations are explicitly stated, and confidence indicators are explained

### Export & Share
- **Functionality**: Export charts as images + CSV with embedded metadata (sources, timestamps, methodology summary)
- **Purpose**: Enables defensible reporting for research, journalism, and education
- **Trigger**: User clicks export button from any chart
- **Progression**: Configure export → Select format → Include metadata → Generate → Download with tamper-evident hash → Optionally create public permalink
- **Success criteria**: Exports are publication-ready, metadata is comprehensive, permalinks are immutable, and exports can be independently verified

### Wage vs Essentials Analytics Module
- **Functionality**: Comprehensive analysis quantifying whether minimum wage increases keep up with essential-goods inflation through multi-dimensional affordability metrics
- **Purpose**: Provide workers, policymakers, advocates, journalists, and educators with evidence-driven insights on purchasing power trends and wage-price dynamics
- **Trigger**: User navigates to "Analytics" tab from main navigation
- **Progression**: Select region → Choose time window → View dashboard with verdict ("kept up" / "lagged" / "unclear") → Explore item-level outpacing rankings → Analyze wage increase event studies → Review methodology → Export methodology card + CSV data
- **Success criteria**: All calculations are deterministic and reproducible, verdicts show transparent logic with configurable thresholds, event studies detect wage change dates accurately, exports include complete methodology cards with formulas and data provenance

#### Sub-features:
- **Minimum Wage vs Basket Dashboard**: Headline verdict on affordability change with indexed trend chart overlaying wage_index(t) vs basket_index(t) where both are normalized to 100 at user-selected base date
- **Item Outpacing Rankings**: Sortable table showing relative_outpacing_i = item_growth - wage_growth for each essential item, ranked by magnitude, with bar chart visualization
- **Wage Increase Event Studies**: Timeline of minimum wage effective dates with pre/post affordability windows (configurable 3/6/12 month periods), showing Δhours_of_work for basket and key items
- **Affordability Ratio Analysis**: Primary metric basket_affordability_ratio = basket_hours(t2) / basket_hours(t1), displayed prominently with both absolute change in hours and percentage change
- **Real vs Nominal Toggles**: All views support switching between nominal dollars, CPI-adjusted real dollars (with disclosed index and base year), and hours-of-work metrics
- **Methodology Card Export**: Downloadable document containing all formulas (wage_growth, item_growth, hours_worked, real_price, affordability_ratio), data sources with retrieval timestamps, region/jurisdiction details, time window, base dates, wage type (federal/state/city), basket composition, CPI series used, confidence flags, and data coverage metrics
- **Shareable Permalinks**: Generate immutable URLs encoding complete analytics configurations (region, date range, base date, wage type, metric mode, basket composition, verdict threshold, event window) with tamper-evident hash for verification; automatically loads configuration from URL parameter when shared link is accessed; displays alert when viewing a permalink to indicate configuration is loaded from external source

### Shareable Permalink Feature
- **Functionality**: Generate and share permanent links that encode complete analytics configurations, enabling reproducible analysis and citation-ready URLs for research and reporting
- **Purpose**: Allow users to share exact analytics configurations with colleagues, include in publications, archive in research documentation, and ensure analysis reproducibility across time
- **Trigger**: User clicks "Share Configuration" button in Analytics view after configuring their desired analysis parameters
- **Progression**: Configure analytics (region, dates, metrics) → Click "Share Configuration" → View dialog with permalink URL → Copy to clipboard → Share URL → Recipient opens URL → Analytics view automatically loads with identical configuration → Alert indicates loaded from permalink
- **Success criteria**: URL contains all configuration parameters base64-encoded; decoded configuration exactly matches original; shared links work indefinitely; configuration hash provides tamper-evidence; UI clearly indicates when viewing a permalink vs modifying locally; any modifications to permalink-loaded config create a new configuration state

### Data Source Refresh Management
- **Functionality**: User-initiated refresh of API data sources (USDA, EIA, BLS) with status tracking, timestamps, and per-source or global refresh controls
- **Purpose**: Empower users to update data on-demand while maintaining transparency about data freshness and retrieval status
- **Trigger**: User navigates to "Sources" tab or clicks data timestamp indicators on Home/Analytics views
- **Progression**: View data sources list → Click "Refresh" on individual source or "Refresh All" → System initiates API requests (simulated) → Progress indicators show refreshing state → Status updates show success/error per source → Timestamp metadata persisted to KV storage → Updated retrieval times displayed throughout app
- **Success criteria**: Refresh status persists across sessions; each source shows last refresh timestamp, connection status (success/error/idle), and retrieval message; failed refreshes provide actionable error messages; global refresh processes all sources in parallel; Home and Analytics views display "Updated X ago" indicators with click-through to Sources view; all source metadata (provider, license, URL) displayed with direct links to official documentation

## Edge Case Handling

- **API Outage**: Display last successful data with prominent "stale data" warning and retry timestamp, allow manual refresh attempt, show specific source failure messages
- **Missing Region Coverage**: Show national/broader geography as fallback with explicit note about granularity
- **Unit Mismatch**: Flag items with inconsistent units, show conversion formula, preserve raw values
- **Outliers/Anomalies**: Calculate statistical bounds, flag suspicious values, show confidence rating
- **No Wage Data**: Default to federal minimum wage with clear label, prompt user to customize
- **Empty State**: Show example baskets and guided tours for first-time users
- **Large Time Series**: Progressive loading with skeleton states, virtualized rendering for performance
- **Offline Use**: Cache previously viewed charts, show sync status, queue actions when offline
- **Refresh Failures**: Show per-source error states, allow individual retry, preserve last successful data with age indicator

## Design Direction

The design should evoke **authority, clarity, and scientific rigor** while remaining accessible to non-experts. Think data journalism aesthetic—The New York Times Upshot, FiveThirtyEight, or Our World in Data. Serious without being sterile, informative without being overwhelming. The interface should feel like a research tool built with care, where every element reinforces trustworthiness and transparency.

## Color Selection

Drawing from data visualization and financial analytics palettes with an emphasis on legibility and accessibility.

- **Primary Color**: `oklch(0.45 0.15 250)` - Deep blue-violet that conveys authority and trustworthiness, used for primary actions and key metrics
- **Secondary Colors**: 
  - Slate backgrounds `oklch(0.95 0.01 250)` for subtle container hierarchy
  - Warm gray `oklch(0.85 0.01 60)` for secondary UI elements
- **Accent Color**: `oklch(0.65 0.20 140)` - Vibrant teal for highlighting active selections and important data points
- **Data Visualization Palette**:
  - Chart 1 (primary series): `oklch(0.55 0.22 250)` - Strong blue
  - Chart 2 (comparison): `oklch(0.62 0.20 30)` - Warm amber
  - Chart 3: `oklch(0.58 0.18 160)` - Fresh green
  - Chart 4: `oklch(0.50 0.15 320)` - Plum
  - Chart 5: `oklch(0.48 0.12 200)` - Steel blue
- **Semantic Colors**:
  - Increase: `oklch(0.50 0.15 140)` - Muted green (not celebratory)
  - Decrease: `oklch(0.55 0.18 25)` - Amber-orange (neutral warning)
  - Error/Alert: `oklch(0.55 0.20 25)` - Warm red

**Foreground/Background Pairings**:
- Background (White `oklch(0.99 0 0)`): Foreground text `oklch(0.20 0.01 250)` - Ratio 13.2:1 ✓
- Primary (`oklch(0.45 0.15 250)`): White text (`oklch(0.99 0 0)`) - Ratio 8.1:1 ✓
- Accent (`oklch(0.65 0.20 140)`): Dark text (`oklch(0.20 0.01 250)`) - Ratio 6.8:1 ✓
- Card/Muted (`oklch(0.95 0.01 250)`): Dark text (`oklch(0.20 0.01 250)`) - Ratio 11.5:1 ✓

## Font Selection

Typography should project **precision, modernity, and legibility**, especially for dense data tables and chart annotations.

- **Display/Headings**: **Space Grotesk** - Geometric sans with distinctive character, strong presence for section headers and dashboard headlines
- **Body/UI**: **IBM Plex Sans** - Designed for UI with excellent readability at small sizes, technical heritage that fits the data-tool aesthetic
- **Data/Monospace**: **JetBrains Mono** - Used for precise numeric displays, formulas, and source citations

**Typographic Hierarchy**:
- H1 (Dashboard Title): Space Grotesk Bold / 32px / -0.02em letter-spacing / 1.1 line-height
- H2 (Section Headers): Space Grotesk SemiBold / 24px / -0.01em / 1.2
- H3 (Card Titles): Space Grotesk Medium / 18px / 0 / 1.3
- Body (Primary): IBM Plex Sans Regular / 15px / 0 / 1.6
- Small (Metadata): IBM Plex Sans Regular / 13px / 0 / 1.5
- Data Labels: JetBrains Mono Medium / 14px / 0 / 1.4
- Large Metrics: JetBrains Mono Bold / 28px / -0.01em / 1.1

## Animations

Animations should reinforce data relationships and state changes without distracting from analysis. Use purposeful motion for: (1) Chart transitions when switching metric modes (morph between views), (2) Item additions to comparison (subtle scale + fade), (3) Loading states (skeleton pulses, not spinners), (4) Tooltip reveals (quick fade + slight translate), (5) Panel expansions (smooth height with easing). All animations 200-350ms with ease-out curves. Avoid animation on data point updates—show change indicators instead.

## Component Selection

**Components**:
- **Card**: Primary container for basket items, chart configurations, methodology sections. Tailwind: subtle border, rounded-lg, shadow-sm on hover
- **Table**: For source listings, audit logs, and detailed price series. Shadcn Table with sticky headers for long lists
- **Tabs**: Navigation between Home/Explore/Compare/Methodology. Shadcn Tabs with underline indicator
- **Select**: Region selection, time period pickers, wage source dropdowns. Shadcn Select with search for long lists
- **Dialog**: Export configurations, methodology details, source citations. Shadcn Dialog with clear hierarchy
- **Tooltip**: Formula explanations, confidence ratings, metadata. Shadcn Tooltip with 300ms delay
- **Badge**: Unit labels, confidence indicators, data freshness. Custom styled with semantic colors
- **Button**: Clear primary/secondary/ghost variants. Primary for actions, ghost for chart controls
- **Input**: Wage entry, search fields. Shadcn Input with validation states
- **Slider**: Date range selection, zoom controls. Shadcn Slider with value labels
- **Skeleton**: Loading states for charts and data tables. Shadcn Skeleton with subtle pulse

**Customizations**:
- **MetricCard**: Custom component combining Card + large numeric display + trend indicator + sparkline
- **ChartContainer**: Wrapper for D3 charts with consistent padding, axis styling, and responsive behavior
- **SourceTag**: Compact inline citation with popover to full source details
- **ConfidenceIndicator**: Visual rating (dots/bars) + tooltip explaining quality score
- **FormulaBlock**: Math notation renderer with syntax highlighting for formulas

**States**:
- Buttons: Distinct hover (slight bg darken), active (scale 0.98), disabled (50% opacity), focus (ring-2 ring-accent)
- Inputs: Border color shift on focus, error state with red border + message, success with subtle green accent
- Cards: Hover elevation increase (shadow-md), selected state with accent border
- Chart elements: Hover highlights series with others at 40% opacity, click toggles series visibility

**Icon Selection**:
- Navigation: House (home), MagnifyingGlass (explore), ChartLine (compare), Gear (settings)
- Actions: Plus/Minus (add/remove items), ArrowsOut (expand), Export, ShareNetwork
- Data: TrendUp/TrendDown (price changes), Clock (time series), CurrencyDollar, User (wage)
- Info: Info (methodology), Question (help), WarningCircle (confidence alerts), CheckCircle (verified)
- Controls: CaretUp/Down (sort), Funnel (filter), SlidersHorizontal (configure)

**Spacing**:
- Container padding: p-6 for main sections, p-4 for cards, p-3 for compact items
- Vertical spacing: space-y-6 between major sections, space-y-4 within sections, space-y-2 for related items
- Grid gaps: gap-6 for card grids, gap-4 for form layouts, gap-2 for inline groups
- Component spacing: Buttons have px-4 py-2, inputs have px-3 py-2, large touch targets min 44px

**Mobile**:
- Tabs → Horizontal scroll with snap points, sticky navigation bar
- Tables → Horizontal scroll with fixed first column, or card-based stacked layout for key data
- Charts → Full-width with touch-optimized zoom/pan, simplified controls in bottom sheet
- Multi-column grids → Single column stack on <768px, 2-column on tablet, 3+ on desktop
- Dialogs → Full-screen on mobile with slide-up animation
- Large metrics → Reduce font size by 20-30% on mobile, maintain hierarchy
- Sidebars → Drawer pattern with hamburger menu on mobile
