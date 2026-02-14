# Chronos: Generational Economic Insights

A cross-platform evidence-visualization tool that tracks everyday necessities and economic indicators across generations (1950-present), expressing costs in both dollars and "hours of work" to help Americans of all ages explore long-term price trends, wage growth, and volatility through transparent data—building shared understanding across generations rather than blame or division.

**Experience Qualities**:
1. **Unifying**: Promotes civic literacy and cross-generational empathy by showing how economic experiences differ by birth cohort, encouraging respectful dialogue rather than division
2. **Transparent**: Every number traces back to its source with timestamps and formulas exposed; separates observed data from interpretation; includes "what the data shows / what it does not show" guardrails
3. **Educational**: Explains economic cycles, volatility patterns, and historical context using neutral academic explanations with citations, fostering critical thinking over blame

**Complexity Level**: Complex Application (advanced multi-generational analytical platform)
This is a sophisticated generational economics platform with long-run time-series (1950-present), volatility computation, birth-cohort analysis, event-overlay timelines, multi-dimensional comparisons, configurable scenarios, and educational modules. It requires coordinated views (generational dashboard, stability explorer, wage-vs-essentials, event timeline, dialogue mode) with complex state management for cohort filters, volatility windows, and historical annotations.

**Target Users**: Multi-generational families exploring affordability differences, educators teaching economic literacy, students researching historical trends, tradespeople understanding wage dynamics, retirees comparing their experiences with younger generations, researchers analyzing long-term patterns.

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

### Expanded Essentials Catalog (40+ Items)
- **Functionality**: Comprehensive catalog system tracking 40+ essential goods across food staples, proteins, produce, grains, household items, utilities/energy, and agricultural inputs with full unit standardization, conversion rules, and region coverage metadata
- **Purpose**: Provide comprehensive affordability analysis across all household necessities with traceable data provenance and unit consistency
- **Trigger**: Navigate to "Expanded Catalog" from main navigation or search from any view
- **Progression**: Browse by category → Search with synonyms → View item details (unit standards, alt units, coverage) → Mark favorites → Add to comparison basket → Select basket templates (Family of 4, Single Adult, Tradesperson)
- **Success criteria**: 40+ items across categories; each item defines standard unit, acceptable alternates, and conversion factors; coverage and confidence shown per item/region; synonym search works (e.g., "hamburger" finds "ground beef"); basket templates populate comparison view; favorites persist across sessions

#### Expanded Catalog Categories & Items:
- **Dairy**: eggs, milk, butter, cheese
- **Meat**: ground beef, beef steak, pork chops, bacon
- **Proteins**: chicken breast, whole chicken, canned tuna, dried beans
- **Produce**: apples, bananas, potatoes, onions, tomatoes, lettuce
- **Grains**: rice, pasta
- **Staples**: bread, flour, sugar, salt, coffee
- **Household**: toilet paper, paper towels, laundry detergent, bar soap, diapers
- **Fuel**: gasoline, diesel, propane, heating oil
- **Utilities**: electricity (kWh), natural gas (therm/ccf), rent index
- **Agricultural Inputs**: garden seeds, potting soil, fertilizer, animal feed

### Data Connector Architecture & Pipeline
- **Functionality**: Modular connector system per data source (USDA-AMS, USDA-NASS, EIA, BLS, FRED) with feature flags, circuit breakers, rate limiting, retry logic, and independent enable/disable controls
- **Purpose**: Build resilient, auditable data ingestion that degrades gracefully on API outages while maintaining data integrity and security
- **Trigger**: Background scheduled fetch jobs (hourly/daily per source) or user-initiated manual refresh from Sources view
- **Progression**: Scheduler triggers connector → Connector checks if enabled/feature-flagged → Respects rate limits → Fetches raw data with retries/backoff → Validates schema → Stores raw immutable → Normalizes (unit conversion, frequency alignment, QA checks) → Computes confidence score → Updates UI with timestamps
- **Success criteria**: Each connector independently disableable; circuit breaker trips after threshold failures; rate limits enforced per source; raw data preserved alongside normalized; validation flags (schema errors, negative prices, outliers, sudden jumps, duplicates) stored per point; connectors list allowed domains; all API keys server-side only

### Normalization Pipeline & Validation
- **Functionality**: Multi-stage pipeline storing raw data immutably, then creating normalized series with unit conversion, frequency alignment (daily/weekly/monthly), QA flagging (schema, unit, impossible values, outliers, gaps), and confidence scoring
- **Purpose**: Ensure data accuracy, auditability, and traceability while surfacing data quality issues transparently
- **Trigger**: Automatically after each connector fetch; viewable in Source Registry and Methodology views
- **Progression**: Raw data ingested → Schema validation → Unit normalization (lb/oz/kg conversions) → Frequency alignment with selectable aggregation (end-of-period, mean, median) → Outlier detection (robust z-score) → Sudden jump detection → Duplicate removal → Missing interval detection → Confidence score computation (coverage × recency × outlier rate × provider tier) → Store raw + normalized side-by-side
- **Success criteria**: Raw and normalized coexist for all series; every point has QA flags array; validation checks include negative prices, unit mismatches, statistical outliers (z-score > 3.5), duplicates; confidence shown as high/medium/low with factor breakdown; users can filter by confidence threshold; methodology documents all aggregation rules

### Source Registry View
- **Functionality**: Comprehensive registry displaying every data source with provider name, official status, reliability tier (1/2/3), license terms, series IDs, coverage map, refresh schedule, connector status, rate limits, last fetch timestamp, and errors
- **Purpose**: Establish transparency and credibility by making all data provenance visible and auditable
- **Trigger**: Navigate to "Source Registry" tab
- **Progression**: View source list → See official badges, tier ratings, active status → Inspect license/terms → View covered items and regions → Check connector health (enabled, rate limits, retries) → Click through to official source URL → Review last fetch time and any errors
- **Success criteria**: Every source shows provider, license, terms summary; official sources badged; reliability tiers visible (tier-1 = government primary data); coverage map shows regions per item; connector status shows enabled state, rate limits, circuit breaker config; links to official documentation work; error messages actionable; registry totals (sources, official count, items, active connectors) displayed

### Unit Standards & Conversions
- **Functionality**: Each item defines a standard unit ($/dozen, $/gallon, $/lb, $/kWh, etc.), acceptable alternate units, and explicit conversion factors stored as metadata
- **Purpose**: Enable cross-source data integration and ensure price comparisons are unit-consistent
- **Trigger**: Automatically during normalization pipeline when source data arrives in non-standard units
- **Progression**: Raw data arrives with unit → Check against item's standard unit → If mismatch, look up conversion factor → Apply conversion → Store both raw and normalized values → Display standard unit in UI
- **Success criteria**: Conversion factors defined for common pairs (lb↔oz, lb↔kg, gallon↔liter, therm↔kWh, etc.); normalization logs show conversion applied; UI always displays standard unit; raw data with original unit preserved; methodology documents conversion formulas

### Confidence Scoring & Filtering
- **Functionality**: Per-series confidence score (0-100) computed from coverage (data point density), recency (days since last update), outlier rate (% flagged points), and provider reliability tier (tier-1=100, tier-2=75, tier-3=50)
- **Purpose**: Help users identify high-quality datasets and filter out low-confidence series
- **Trigger**: Automatically computed after normalization; displayed in item cards, Source Registry, and chart config
- **Progression**: Series normalized → Count valid points vs expected → Measure days since last update → Calculate outlier % → Look up provider tier → Compute weighted score (30% coverage + 20% recency + 30% outlier-free + 20% tier) → Display badge (high ≥80, medium 50-79, low <50) → Allow filtering in Explore view
- **Success criteria**: Score updates with each data refresh; formula transparent in Methodology; users can filter items by confidence threshold; low-confidence series show warning badges; factor breakdown visible (coverage: X%, recency: Y%, etc.)

### Basket Templates
- **Functionality**: Pre-configured item baskets for common household types: "Family of 4" (2 adults + 2 children weekly essentials), "Single Adult", "Tradesperson (Fuel-Heavy)"
- **Purpose**: Provide realistic starting points for affordability analysis and save users from manually selecting items
- **Trigger**: Displayed in Expanded Catalog view; click "Add All to Comparison" button
- **Progression**: User browses templates → Sees item list preview → Clicks "Add All" → All template items added to selection → Navigate to Compare view to see basket analysis
- **Success criteria**: Templates show item count and preview; "Add All" button bulk-selects items; templates include realistic quantities (e.g., Family of 4: 2 dozen eggs/week, 3 gal milk, 20 gal gas); users can edit after adding; templates persist and can be favorited

### Data Source Refresh Management
- **Functionality**: User-initiated and automated refresh of API data sources (USDA, EIA, BLS) with configurable schedules (hourly/daily/manual), status tracking, timestamps, and per-source or global refresh controls
- **Purpose**: Empower users to keep data current through automatic scheduled updates or on-demand manual refreshes while maintaining full transparency about data freshness and retrieval status
- **Trigger**: User navigates to "Sources" tab, clicks data timestamp indicators on Home/Analytics views, or automatic scheduler triggers based on configured frequency
- **Progression**: View data sources list → Configure auto-refresh schedule (hourly/daily/manual) and enable/disable → Click "Refresh" on individual source or "Refresh All" for manual updates → System initiates API requests (simulated) → Progress indicators show refreshing state → Status updates show success/error per source → Timestamp metadata persisted to KV storage → Updated retrieval times displayed throughout app → Next scheduled refresh calculated and shown
- **Success criteria**: Refresh status persists across sessions; each source shows last refresh timestamp, connection status (success/error/idle), and retrieval message; failed refreshes provide actionable error messages; global refresh processes all sources in parallel; auto-refresh scheduler runs in background when enabled; hourly schedule checks on the hour; daily schedule runs at 2:00 AM; schedule configuration persists and survives page reloads; UI shows next scheduled refresh time; users can toggle auto-refresh on/off; Home and Analytics views display "Updated X ago" indicators with click-through to Sources view; all source metadata (provider, license, URL) displayed with direct links to official documentation; audit logs track both manual and scheduled refresh operations

#### Auto-Refresh Schedules:
- **Manual Mode**: No automatic updates; all refreshes triggered explicitly by user action
- **Hourly Schedule**: Data sources automatically checked and updated at the start of each hour (XX:00); suitable for users monitoring volatile commodity prices or time-sensitive analysis
- **Daily Schedule**: Data sources automatically refreshed once per day at 2:00 AM local time; recommended for most users as it balances freshness with minimal resource usage
- **Schedule Configuration**: Toggle to enable/disable auto-refresh; dropdown to select frequency; displays next scheduled refresh time and last scheduled refresh time; recommendations explain which schedule suits different use cases
- **Graceful Degradation**: If a scheduled refresh fails, system retries on next schedule; user notified via toast; cached data remains available with "stale" indicator; manual refresh available as override

---

## Generational Economic Timeline Features

### Generational Dashboard
- **Functionality**: Interactive timeline spanning 1950-present with selectable generation overlays (Silent Generation, Baby Boomers, Gen X, Millennials, Gen Z) showing wages, essential goods prices, CPI, unemployment, interest rates, and volatility bands
- **Purpose**: Help Americans understand how economic experiences differ by birth cohort, fostering empathy and shared understanding across generations
- **Trigger**: User navigates to "Generations" tab or selects birth year filter
- **Progression**: View timeline → Select birth year or generation → See affordability at ages 25/35/45 for that cohort → Compare multiple generations side-by-side → Toggle volatility overlays → Explore major events → Access dialogue prompts
- **Success criteria**: Timeline loads decades of data smoothly (<3s); generation overlays clearly show cohort boundaries; affordability calculations use accurate historical wage/price data at calendar years corresponding to life stages; assumptions about interpolation are explicitly labeled; UI includes "What the data shows / What it does not show" panel

### Long-Term Stability vs Volatility Explorer
- **Functionality**: Dual-mode visualization showing (1) long-term trend view with smoothed rolling averages and (2) raw fluctuation view with volatility bands computed as standard deviation of annualized percent change over user-selected rolling windows (3-year, 5-year, 10-year)
- **Purpose**: Separate stable growth periods from turbulent volatility cycles without implying intentional coordination; show observed patterns objectively
- **Trigger**: User clicks "Stability Analysis" or toggles volatility view from timeline
- **Progression**: View long-term trends → Toggle to raw data view → Select volatility window (3/5/10 year) → System computes rolling stddev of annualized changes → Visualize volatility bands → Identify stability vs turbulence periods → Cross-reference with event timeline
- **Success criteria**: MUST clearly label smoothing method (e.g., "12-month moving average"); MUST allow instant toggle between smoothed and raw; MUST never hide access to underlying data; volatility formula shown in expandable tooltip; window length selector prominent and reactive

### Wage vs Essentials Across Decades
- **Functionality**: Multi-decade comparison (1950s through 2020s) showing how hours-of-work for essential basket evolved, with decade-by-decade breakdown and generation-specific views
- **Purpose**: Quantify long-term affordability trends and show which essentials outpaced wage growth over different eras
- **Trigger**: User selects "Decades Comparison" or explores from Generational Dashboard
- **Progression**: Select decades to compare → View basket affordability by decade → See item-level changes → Filter by generation → Export decade report → Access methodology
- **Success criteria**: Each decade shows median wage, basket cost, and hours-of-work; missing data clearly flagged with coverage notes; decade boundaries and aggregation rules explained; generation filter shows affordability at equivalent life stages

### Event Overlay Timeline
- **Functionality**: Historical timeline with annotated major economic events (recessions, oil shocks, financial crises, policy changes) overlaid on price/wage/volatility charts, with citations to credible academic or government sources
- **Purpose**: Show how volatility correlates with documented events; provide context without implying hidden coordination; support media literacy
- **Trigger**: User toggles "Events" overlay or clicks timeline markers
- **Progression**: View economic timeline → Toggle event markers → Click event to see details + citation → See correlation with volatility metrics → Access educational explainer → Link to primary sources
- **Success criteria**: Every event includes: name, date, brief neutral description, citation with URL, relevant metrics during event window; events MUST cite credible sources (NBER, Fed, BLS, academic papers); interpretive language avoided; users can filter event types (recessions, policy, shocks)

### Psychological Perspective Module
- **Functionality**: Educational content explaining economic cycles (expansion, contraction, business cycles), supply shocks, monetary policy (tightening/loosening), inflation dynamics, and media amplification effects using neutral academic language with citations
- **Purpose**: Build economic literacy; help users understand volatility as systemic patterns rather than conspiracies; encourage critical thinking
- **Trigger**: User clicks "Learn About Economics" or accesses explainers from info icons throughout app
- **Progression**: Browse topics (cycles, inflation, monetary policy, supply shocks) → Read explanations with diagrams → View cited sources → Apply learning to timeline exploration → Access glossary
- **Success criteria**: Content written at 10th-grade reading level; avoids political framing; cites economics textbooks, Fed publications, NBER papers; includes visual diagrams of concepts; glossary defines technical terms; cross-linked to relevant timeline periods

### Civic Dialogue Mode
- **Functionality**: Structured discussion prompts grounded in data, designed to encourage cross-generational empathy and respectful conversation about economic experiences
- **Purpose**: Transform economic data into conversation-ready insights that promote unity through shared understanding rather than accusatory framing
- **Trigger**: User clicks "Start Discussion" or accesses from Generational Dashboard
- **Progression**: Select topic (affordability across generations, volatility experiences, wage growth eras) → View data-grounded prompt → See relevant charts → Generate discussion guide → Export for classroom/family use
- **Success criteria**: Prompts avoid blame language; questions structured as "How did X differ between Y and Z?" rather than "Why did X group do Y?"; each prompt links to specific data visualizations; export includes charts + questions + methodology; educator mode provides facilitator guidance

### Mathematical Transparency
- **Functionality**: Every derived metric (growth rate, CAGR, rolling average, volatility band, affordability ratio, inflation adjustment) displays its formula in expandable tooltips with links to raw data points
- **Purpose**: Establish trust through radical transparency; enable independent verification; support academic citation
- **Trigger**: User hovers over any metric or clicks formula icon
- **Progression**: Hover metric → See formula tooltip → Click for detailed view → View calculation with actual values → Link to raw data → Export calculation sheet
- **Success criteria**: Formulas use standard mathematical notation; show example calculations with real numbers; link directly to source data points; derived series traceable to raw inputs; CSV exports include formulas as metadata

### Data Integrity & Audit System
- **Functionality**: Complete provenance tracking with CSV export of raw and derived series, dataset snapshot hashing, audit logs for methodology changes, and explicit disclosure of data gaps and revision history
- **Purpose**: Enable reproducible research; establish credibility; allow independent verification; meet academic citation standards
- **Trigger**: User exports data or views methodology details
- **Progression**: Request export → System generates CSV with metadata → Includes hash of dataset snapshot → Audit log shows methodology version → Data gaps documented → Download complete package
- **Success criteria**: MUST export both raw and derived series; MUST include tamper-evident hash; MUST log all methodology changes with dates/reasoning; MUST disclose coverage gaps with date ranges; revision history shows when data updated; exports include source citations with retrieval timestamps

### Narrative Guardrails
- **Functionality**: "What the Data Shows / What It Does Not Show" panels adjacent to every major chart, clearly separating observed volatility from unsupported claims about intentional control or coordination
- **Purpose**: Prevent misinterpretation; maintain civic tone; separate fact from speculation; comply with educational/analytical framing requirements
- **Trigger**: Automatically displayed with charts; can be expanded for detail
- **Progression**: View chart → Read "Shows/Doesn't Show" panel → Understand limitations → Optional: view interpretive perspectives (labeled as opinion) → Make informed conclusions
- **Success criteria**: MUST appear on every analytical view; "Shows" section lists only observable patterns; "Doesn't Show" explicitly states what cannot be concluded; interpretive commentary clearly labeled as perspective; users can toggle interpretive layer off; default view is fact-only

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

The design should evoke **unity, clarity, and educational purpose** while maintaining scientific rigor. Think civic education meets data journalism—The New York Times Upshot, Our World in Data, Federal Reserve educational resources. The aesthetic should feel approachable yet authoritative, bridging generational divides through shared exploration rather than division. Every element should reinforce trustworthiness, neutrality, and transparency. The interface invites multi-generational families, educators, and citizens to explore together, fostering understanding over blame.

## Compliance & Neutrality

**Educational Disclaimer**: Platform includes clear statement that tool is educational and analytical, not financial or political advice. No predictive crisis claims or partisan messaging.

**Evidence Standards**: All historical annotations cite credible primary sources (NBER, Federal Reserve, BLS, academic journals). Avoid attributing intent to unnamed actors or presenting unverified claims.

**Fact-Interpretation Separation**: Observed volatility separated from claims about coordination or control. Interpretive commentary optional and clearly labeled as perspective, not fact.

**Generational Framing**: Language promotes empathy ("How did experiences differ?") rather than blame ("Why did X generation do Y?"). Acknowledges structural economic forces over individual or generational fault.

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
