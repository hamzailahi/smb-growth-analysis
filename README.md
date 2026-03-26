# SMB Growth Strategy Analysis

A data-driven portfolio prioritization framework for U.S. small and medium-sized businesses (SMBs), analyzing 34.8 million firms across 19 industries to identify high-value market segments and quantify advertising acquisition efficiency.

**[Live Dashboard →](https://hamzailahi.github.io/smb-growth-analysis/)**

---

## Overview

This project answers a core strategic question: **given limited sales and marketing resources, which SMB segments should receive priority investment?**

The analysis combines U.S. Census Bureau establishment data with Google Ads industry benchmarks to construct a portfolio prioritization matrix — segmenting industries by market volume, spending capacity, and customer acquisition cost.

## Key Findings

**1. Market concentration requires segmentation.** The top 5 industries represent 56% of all U.S. small businesses. Professional, Scientific, and Technical Services alone accounts for 4.7M firms — more than the bottom 10 industries combined. A uniform go-to-market strategy across all verticals is inherently inefficient.

**2. Nine industries qualify as "Core" priority targets.** These sit in the high-volume (>1M firms) and high-spending (>$300K avg payroll/firm) quadrant, collectively representing 24.6M SMBs. They include Professional Services, Construction, Health Care, Retail Trade, and Accommodation & Food Services.

**3. Retail Trade presents the strongest acquisition efficiency.** With 3.0M SMBs, $355K average payroll per firm, and a Google Ads CPC of just $1.63 — the lowest among Core industries — Retail offers the maximum addressable market per dollar of acquisition spend.

**4. Construction and Professional Services warrant efficiency optimization.** Both are high-value verticals (>$490K payroll/firm) but carry elevated CPCs ($6.11 and $5.37 respectively). The strategic recommendation is to optimize conversion funnels rather than increase top-of-funnel spend.

**5. Advertising remains the dominant revenue driver for major platforms.** Google's advertising segment grew from $135B to $268B between 2019 and 2024, representing 76% of Alphabet's total revenue. SMB acquisition and retention directly impacts platform economics at scale.

## Data Sources

| Source | Description | Coverage |
|--------|-------------|----------|
| [U.S. Census Bureau — SUSB](https://www.census.gov/programs-surveys/susb.html) | Firm count, employment, payroll by industry and enterprise size | 2022 |
| [SBA Office of Advocacy](https://advocacy.sba.gov/) | Small business profiles, state-level demographics | 2024 |
| [WordStream](https://www.wordstream.com/blog/2025-google-ads-benchmarks) | Google Ads CPC, CTR, conversion rate, CPL by industry | 2025 |
| Alphabet Inc. 10-K Filings | Revenue breakdown by advertising segment | 2019–2024 |

## Methodology

### Module 1 — Market Segmentation
Segmented 34.8M U.S. small businesses across 19 NAICS sectors by firm count, employment, and annual payroll. Calculated per-firm metrics (payroll per employer firm, average employees per firm) as proxies for business maturity and spending capacity.

### Module 2 — Attractiveness Scoring
Constructed a composite attractiveness index using three normalized dimensions: market volume (40% weight), per-firm spending capacity (35%), and small-business employment dominance within the sector (25%). Ranked all industries to identify priority verticals.

### Module 3 — Portfolio Prioritization
Built a 2×2 prioritization matrix (Volume × Spending Capacity) with four strategic quadrants:
- **Core** — High volume, high value. Allocate majority of resources.
- **Growth** — High value per firm, lower volume. Targeted expansion.
- **Scale** — High volume, lower margins. Automate with self-serve tools.
- **Niche** — Lower on both dimensions. Selective, opportunistic investment.

### Module 4 — Acquisition Efficiency Overlay
Mapped NAICS industry sectors to Google Ads benchmark categories and calculated cost-adjusted opportunity metrics including leads per $1,000 ad spend, CPC-to-payroll ratios, and segment-level ROI indicators.

## Technical Stack

- **Database:** SQLite with pre-computed analytical views
- **SQL:** CTEs, window functions, composite scoring, and multi-table joins
- **Python:** pandas, matplotlib, seaborn, scipy
- **Dashboard:** React 18 + Recharts, deployed via Vite to GitHub Pages

## Repository Structure

```
gcs-smb-growth-analysis/
├── data/
│   ├── smb_industry_landscape.csv        # Census SUSB industry-level data
│   ├── google_ads_benchmarks_2025.csv    # Google Ads metrics by vertical
│   ├── industry_naics_to_ads_mapping.csv # NAICS ↔ Ads category crosswalk
│   ├── state_smb_overview.csv            # State-level SMB statistics
│   ├── alphabet_financials.csv           # Alphabet revenue breakdown
│   ├── smb_analysis.db                   # SQLite database (all tables + views)
│   ├── dashboard_data.json              # Pre-computed JSON for dashboard
│   └── build_database.py               # ETL: CSV → SQLite pipeline
├── sql/
│   └── analysis_queries.sql             # 12 analytical queries (4 modules)
├── notebooks/
│   └── smb_analysis.ipynb               # Full analysis with visualizations
├── dashboard/
│   ├── src/
│   │   ├── App.jsx                      # React dashboard (5 tabs)
│   │   └── main.jsx                     # Entry point
│   └── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Running Locally

```bash
git clone https://github.com/hamzailahi/smb-growth-analysis.git
cd smb-growth-analysis

# Dashboard
npm install
npm run dev          # Local dev server
npm run deploy       # Deploy to GitHub Pages

# Notebook
# Open notebooks/smb_analysis.ipynb in Jupyter or Google Colab
# Upload data/smb_analysis.db when prompted (Colab) or ensure relative paths resolve
```

## License

MIT

---

**Hamza Ilahi** · [GitHub](https://github.com/hamzailahi)
