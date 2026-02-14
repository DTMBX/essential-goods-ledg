# Chronos - Generational Economic Insights

**Building shared understanding across generations through transparent economic data visualization.**

Chronos is a cross-platform evidence-visualization tool that tracks everyday necessities and economic indicators across generations (1950-present), expressing costs in both dollars and "hours of work" to help Americans of all ages explore long-term price trends, wage growth, and volatility.

---

## ✨ Key Features

### 📊 Core Analytics
- **Expanded Catalog** - Track 40+ essential goods across 10 categories (food, household, energy, inputs)
- **Basket Snapshot** - Monitor essential goods with customizable basket templates
- **Hours of Work** - Convert prices into work-time for visceral affordability understanding
- **CPI Integration** - Real vs nominal price analysis with inflation adjustment
- **Multi-Series Charts** - Compare multiple items across time periods

### 🏗️ Data Pipeline (New in v1.0)
- **8 Official Sources** - USDA-AMS, USDA-NASS, EIA (3 connectors), BLS (2 connectors), FRED
- **Robust Validation** - Schema checks, unit normalization, outlier detection, QA flagging
- **Confidence Scoring** - Quality scores from coverage, recency, outlier rate, and provider tier
- **Source Registry** - Complete transparency view with licensing, terms, and connector status
- **Unit Standardization** - 14+ unit types with automatic conversion (lb↔oz↔kg, gallon↔liter, etc.)

### 🌐 Generational Insights
- **Timeline Analysis** - Economic experiences from Silent Generation through Gen Z
- **Volatility Explorer** - Identify stability vs turbulence periods (1950-present)
- **Event Overlays** - Historical context from recessions, policy changes, economic shocks
- **Affordability Comparison** - How purchasing power differs by birth cohort

### 🔬 Transparency & Methodology
- **Formula Tooltips** - Every metric shows its calculation
- **Source Citations** - Complete API provenance with retrieval timestamps
- **Data Integrity** - Raw + normalized data side-by-side with checksums
- **Narrative Guardrails** - "What the data shows / doesn't show" panels

### 🔄 Data Management
- **Auto-Refresh** - Hourly or daily scheduled updates per source
- **Manual Refresh** - On-demand data updates with real-time status
- **Source Tracking** - Last refresh timestamps and connection monitoring
- **Graceful Degradation** - Cached data available during source failures
- **Circuit Breakers** - Auto-disable connectors after failure threshold

### 📤 Sharing & Export
- **Shareable Permalinks** - Reproducible configurations with tamper-evident hashing
- **CSV Export** - Raw and derived data with complete metadata
- **Methodology Cards** - Publication-ready documentation
- **Citation-Ready** - Built for research, journalism, education

---

## 🎨 Design System

Chronos features a comprehensive custom design system:

- **Custom Logo** - Generational continuity symbol
- **25+ Custom Icons** - Purpose-built SVG icon set with thin/regular/bold weights
- **OKLCH Color System** - Perceptually uniform, accessible palette
- **Three Typefaces** - Space Grotesk (display), IBM Plex Sans (body), JetBrains Mono (data)

[View Brand Guidelines →](./BRAND_GUIDELINES.md)

### Icon Preview

Navigate to `/#icons` to see the complete icon system showcase with usage examples.

---

## 🚀 Getting Started

This is a Spark application built with:
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with custom theme
- **Shadcn UI v4** components
- **Framer Motion** for animations
- **D3.js** for data visualization
- **Spark KV** for persistent storage

### Development

The app runs automatically in your Spark environment. Simply navigate between views:

- **Home** - Dashboard overview with basket snapshot
- **Explore** - Browse original 8-item catalog
- **Full Catalog** (NEW) - Browse 40+ essentials with category filtering and search
- **Compare** - Multi-series chart builder
- **Analytics** - Wage vs essentials analysis with permalinks
- **Generations** - Cross-generational timeline
- **Volatility** - Stability explorer
- **Learn** - Economic literacy modules
- **Methodology** - Formulas and data sources
- **Sources** - API refresh management
- **Source Registry** (NEW) - Complete data provenance and quality view
- **Settings** - Wage configuration

### Key Documentation

#### Core Documentation
- [Product Requirements](./PRD.md) - Complete feature specifications (updated for v1.0)
- [Expanded Catalog Implementation](./EXPANDED_CATALOG_IMPLEMENTATION.md) - Architecture and acceptance criteria (NEW)
- [Developer Guide](./DEVELOPER_GUIDE.md) - How to add items, sources, and connectors (NEW)
- [Files Modified](./FILES_MODIFIED.md) - Change log for Iteration 15 (NEW)

#### Design & Brand
- [Brand Guidelines](./BRAND_GUIDELINES.md) - Logo, icons, typography, colors
- [Visual Identity Bible](./VISUAL_IDENTITY_BIBLE.md) - Comprehensive design system

#### Security & Privacy
- [Security & RBAC Guide](./SECURITY_RBAC_GUIDE.md) - Auth, permissions, audit logging (NEW)
- [Security Overview](./SECURITY.md) - Data integrity and privacy practices

#### Feature Documentation
- [Permalink Documentation](./PERMALINK_DOCUMENTATION.md) - Shareable configuration system
- [Analytics Summary](./ANALYTICS_SUMMARY.md) - Wage vs essentials methodology
- [Loading States](./LOADING_STATES.md) - Progressive loading patterns

---

## 🧠 Philosophy

Chronos is built on principles of:

1. **Unity Through Understanding** - Foster cross-generational empathy
2. **Radical Transparency** - Show all formulas, sources, and limitations
3. **Evidence-First** - Separate observed data from interpretation
4. **Civic Education** - Build economic literacy without partisan framing
5. **Methodological Rigor** - Every conclusion traceable to cited data

**We aim to illuminate economic patterns, not attribute blame.**

---

## 🎯 Target Users

- **Households** budgeting for groceries and fuel
- **Workers** paid hourly who think in time-cost
- **Educators** teaching economic literacy
- **Researchers** analyzing long-term trends
- **Journalists** creating evidence-driven stories
- **Multi-generational families** exploring shared history
- **Policy analysts** examining affordability shifts

---

## 📊 Data Sources (v1.0 Expanded)

### Official Government Sources (8 Connectors)
- **USDA-AMS** - Agricultural Marketing Service (dairy, proteins)
- **USDA-NASS** - National Agricultural Statistics (produce, meat, inputs)
- **EIA-Petroleum** - Energy Information Administration (gasoline, diesel, propane, heating oil)
- **EIA-Natural Gas** - Natural gas pricing
- **EIA-Electricity** - Residential electricity rates
- **BLS-Wage** - Bureau of Labor Statistics wage data
- **BLS-CPI** - Consumer Price Index
- **FRED-Housing** - Federal Reserve rent indices

### Coverage
- **41 Items** across 10 categories
- **Tier-1 Reliability** (all official government sources)
- **Multiple Regions** (US-National, Midwest, Northeast, South, West where applicable)

All sources displayed with:
- Provider name and official status badge
- License and usage terms
- Series identifiers
- Coverage map (regions × items)
- Refresh schedule (hourly/daily)
- Connector health status
- Last successful fetch timestamp
- Rate limits and circuit breaker configuration
- Direct links to official documentation

[View Source Registry →](/#registry)

---

## 🔐 Privacy & Security

- **Minimal Data Collection** - Optional anonymous use
- **Transparent Calculations** - Deterministic and reproducible
- **Audit Logs** - Complete provenance tracking
- **No Financial Advice** - Educational tool with clear disclaimers
- **Client-Side Storage** - User preferences via Spark KV

---

## 🎨 Custom Icon System

Chronos includes 25+ custom-designed SVG icons:

**Navigation:** Home, Explore, Compare, Analytics, Settings  
**Features:** Timeline, Generations, Affordability, Volatility, Basket, Insight, Education, Dialogue  
**Data:** DataSource, Methodology, Refresh, Verified, Warning  
**Actions:** Share, Export, Filter, Calendar  
**Indicators:** TrendUp, TrendDown, Clock

All icons available in three weights (thin, regular, bold) and fully scalable.

---

## 📝 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

## 🤝 Contributing

This is an educational economics visualization tool. Contributions should:

- Maintain political neutrality
- Cite credible sources
- Separate fact from interpretation
- Support cross-generational dialogue
- Follow established design system

---

**Chronos** - Understanding our economic past to build a shared future.
