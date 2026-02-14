# Chronos - Generational Economic Insights

**Building shared understanding across generations through transparent economic data visualization.**

Chronos is a cross-platform evidence-visualization tool that tracks everyday necessities and economic indicators across generations (1950-present), expressing costs in both dollars and "hours of work" to help Americans of all ages explore long-term price trends, wage growth, and volatility.

---

## ✨ Key Features

### 📊 Core Analytics
- **Basket Snapshot** - Track essential goods (eggs, milk, butter, cheese, beef, gasoline, propane)
- **Hours of Work** - Convert prices into work-time for visceral affordability understanding
- **CPI Integration** - Real vs nominal price analysis with inflation adjustment
- **Multi-Series Charts** - Compare multiple items across time periods

### 🌐 Generational Insights
- **Timeline Analysis** - Economic experiences from Silent Generation through Gen Z
- **Volatility Explorer** - Identify stability vs turbulence periods (1950-present)
- **Event Overlays** - Historical context from recessions, policy changes, economic shocks
- **Affordability Comparison** - How purchasing power differs by birth cohort

### 🔬 Transparency & Methodology
- **Formula Tooltips** - Every metric shows its calculation
- **Source Citations** - Complete API provenance with retrieval timestamps
- **Data Integrity** - Tamper-evident exports with versioned methodology
- **Narrative Guardrails** - "What the data shows / doesn't show" panels

### 🔄 Data Management
- **Auto-Refresh** - Hourly or daily scheduled updates
- **Manual Refresh** - On-demand data updates per source
- **Source Tracking** - Last refresh timestamps and status monitoring
- **Graceful Degradation** - Cached data available during source failures

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
- **Explore** - Browse and search essential goods
- **Compare** - Multi-series chart builder
- **Analytics** - Wage vs essentials analysis
- **Generations** - Cross-generational timeline
- **Volatility** - Stability explorer
- **Learn** - Economic literacy modules
- **Methodology** - Formulas and data sources
- **Sources** - API refresh management
- **Settings** - Wage configuration

### Key Documentation

- [Product Requirements](./PRD.md) - Complete feature specifications
- [Brand Guidelines](./BRAND_GUIDELINES.md) - Logo, icons, typography, colors
- [Permalink Documentation](./PERMALINK_DOCUMENTATION.md) - Shareable configuration system
- [Analytics Summary](./ANALYTICS_SUMMARY.md) - Wage vs essentials methodology
- [Security](./SECURITY.md) - Data integrity and privacy practices

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

## 📊 Data Sources

- **USDA NASS** - Agricultural commodity prices
- **EIA** - Energy prices (gasoline, propane)
- **BLS** - Consumer Price Index, wage series
- **Federal Reserve** - Historical economic indicators

All sources displayed with:
- Provider and license information
- Last refresh timestamp
- Connection status
- Direct links to official documentation

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
