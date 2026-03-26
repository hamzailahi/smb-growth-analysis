-- ============================================================
-- SMB GROWTH STRATEGY ANALYSIS
-- SQL Analysis Queries for Google GCS Portfolio Prioritization
-- Data: Census SUSB 2022 + WordStream Google Ads Benchmarks 2025
-- ============================================================


-- ============================================================
-- MODULE 1: SMB LANDSCAPE SEGMENTATION
-- ============================================================

-- 1A: Industry overview with size distribution
-- Question: What does the U.S. SMB landscape actually look like?
SELECT 
    industry,
    total_small_businesses,
    firms_no_employees,
    firms_1_to_19,
    firms_20_to_499,
    ROUND(firms_no_employees * 100.0 / total_small_businesses, 1) AS pct_nonemployer,
    ROUND(firms_1_to_19 * 100.0 / total_small_businesses, 1) AS pct_micro,
    ROUND(firms_20_to_499 * 100.0 / total_small_businesses, 1) AS pct_small_medium,
    employees_at_small_biz,
    ROUND(payroll_small_thousands / 1e6, 1) AS payroll_billions
FROM smb_landscape
ORDER BY total_small_businesses DESC;


-- 1B: The concentration problem — top 5 industries = what % of all SMBs?
WITH ranked AS (
    SELECT 
        industry,
        total_small_businesses,
        SUM(total_small_businesses) OVER (ORDER BY total_small_businesses DESC) AS cumulative,
        SUM(total_small_businesses) OVER () AS grand_total,
        ROW_NUMBER() OVER (ORDER BY total_small_businesses DESC) AS rank
    FROM smb_landscape
)
SELECT 
    rank,
    industry,
    total_small_businesses,
    ROUND(total_small_businesses * 100.0 / grand_total, 1) AS pct_of_total,
    ROUND(cumulative * 100.0 / grand_total, 1) AS cumulative_pct
FROM ranked
ORDER BY rank;


-- 1C: Size tier analysis — micro vs small-medium economics
SELECT 
    industry,
    employer_firms_small,
    ROUND(employees_at_small_biz * 1.0 / NULLIF(employer_firms_small, 0), 1) AS avg_emp_per_firm,
    ROUND(payroll_small_thousands * 1000.0 / NULLIF(employer_firms_small, 0), 0) AS avg_payroll_per_firm,
    ROUND(payroll_small_thousands * 1000.0 / NULLIF(employees_at_small_biz, 0), 0) AS avg_salary,
    pct_total_emp_at_small,
    pct_total_payroll_at_small
FROM smb_landscape
WHERE employer_firms_small > 0
ORDER BY avg_payroll_per_firm DESC;


-- ============================================================
-- MODULE 2: GROWTH DRIVER ANALYSIS
-- ============================================================

-- 2A: Industry attractiveness scoring
-- Composite score: normalize firm count + payroll per firm + employment share
WITH metrics AS (
    SELECT 
        industry,
        total_small_businesses,
        ROUND(payroll_small_thousands * 1000.0 / NULLIF(employer_firms_small, 0), 0) AS payroll_per_firm,
        pct_total_emp_at_small,
        -- Normalize each metric 0-100
        ROUND(total_small_businesses * 100.0 / (SELECT MAX(total_small_businesses) FROM smb_landscape), 1) AS volume_score,
        ROUND(
            (payroll_small_thousands * 1000.0 / NULLIF(employer_firms_small, 0)) * 100.0 / 
            (SELECT MAX(payroll_small_thousands * 1000.0 / NULLIF(employer_firms_small, 0)) FROM smb_landscape WHERE employer_firms_small > 0),
        1) AS spending_score,
        ROUND(pct_total_emp_at_small * 100.0 / 
            (SELECT MAX(pct_total_emp_at_small) FROM smb_landscape), 1) AS dominance_score
    FROM smb_landscape
    WHERE employer_firms_small > 0
)
SELECT 
    industry,
    total_small_businesses,
    payroll_per_firm,
    pct_total_emp_at_small,
    volume_score,
    spending_score,
    dominance_score,
    ROUND((volume_score * 0.4 + spending_score * 0.35 + dominance_score * 0.25), 1) AS composite_attractiveness
FROM metrics
ORDER BY composite_attractiveness DESC;


-- 2B: Employer density — which industries have the most businesses WITH employees?
-- (These are the ones most likely to need Google Ads)
SELECT 
    industry,
    employer_firms_small,
    firms_no_employees,
    ROUND(employer_firms_small * 100.0 / total_small_businesses, 1) AS employer_rate,
    ROUND(employees_at_small_biz * 1.0 / employer_firms_small, 1) AS avg_team_size,
    CASE 
        WHEN employer_firms_small * 100.0 / total_small_businesses > 30 THEN 'High Employer Density'
        WHEN employer_firms_small * 100.0 / total_small_businesses > 15 THEN 'Medium Employer Density'
        ELSE 'Low Employer Density (mostly solopreneurs)'
    END AS density_classification
FROM smb_landscape
WHERE total_small_businesses > 0
ORDER BY employer_rate DESC;


-- ============================================================
-- MODULE 3: PORTFOLIO PRIORITIZATION FRAMEWORK
-- ============================================================

-- 3A: The Priority Matrix — Volume × Spending Capacity with Google Ads overlay
SELECT 
    industry,
    total_small_businesses,
    avg_payroll_per_firm,
    google_ads_category,
    avg_cpc_usd,
    avg_cpl_usd,
    avg_cvr_pct,
    spending_capacity_tier,
    volume_tier,
    priority_quadrant,
    market_opportunity_score,
    -- ROI indicator: how many firms can you reach per $1000 in CPC?
    ROUND(1000.0 / NULLIF(avg_cpc_usd, 0), 0) AS clicks_per_1000_dollars,
    -- Estimated leads per $1000 (clicks × conversion rate)
    ROUND((1000.0 / NULLIF(avg_cpc_usd, 0)) * (avg_cvr_pct / 100.0), 1) AS est_leads_per_1000_dollars
FROM portfolio_analysis
WHERE avg_cpc_usd IS NOT NULL
ORDER BY priority_quadrant, market_opportunity_score DESC;


-- 3B: Underserved segment identification
-- Industries with HIGH spending capacity but LOW CPC = opportunity
SELECT 
    industry,
    total_small_businesses,
    avg_payroll_per_firm,
    avg_cpc_usd,
    avg_cpl_usd,
    priority_quadrant,
    ROUND(avg_payroll_per_firm / NULLIF(avg_cpc_usd, 0), 0) AS value_to_cost_ratio,
    CASE 
        WHEN avg_payroll_per_firm > 400000 AND avg_cpc_usd < 3.0 THEN '★★★ Prime Opportunity'
        WHEN avg_payroll_per_firm > 300000 AND avg_cpc_usd < 5.0 THEN '★★ Strong Opportunity'
        WHEN avg_payroll_per_firm > 200000 AND avg_cpc_usd < 4.0 THEN '★ Moderate Opportunity'
        ELSE 'Standard'
    END AS opportunity_rating
FROM portfolio_analysis
WHERE avg_cpc_usd IS NOT NULL
ORDER BY value_to_cost_ratio DESC;


-- 3C: GCS resource allocation recommendation
-- If GCS has 100 units of sales capacity, how should they allocate?
WITH scored AS (
    SELECT 
        industry,
        total_small_businesses,
        avg_payroll_per_firm,
        avg_cpc_usd,
        priority_quadrant,
        -- Weighted score for allocation
        ROUND(
            (total_small_businesses * 1.0 / (SELECT MAX(total_small_businesses) FROM portfolio_analysis)) * 40 +
            (avg_payroll_per_firm * 1.0 / (SELECT MAX(avg_payroll_per_firm) FROM portfolio_analysis)) * 35 +
            (1.0 / NULLIF(avg_cpc_usd, 0)) / (SELECT MAX(1.0 / NULLIF(avg_cpc_usd, 0)) FROM portfolio_analysis WHERE avg_cpc_usd IS NOT NULL) * 25
        , 2) AS allocation_score
    FROM portfolio_analysis
    WHERE avg_cpc_usd IS NOT NULL
),
total AS (
    SELECT SUM(allocation_score) AS total_score FROM scored
)
SELECT 
    s.industry,
    s.total_small_businesses,
    s.avg_payroll_per_firm,
    s.priority_quadrant,
    s.allocation_score,
    ROUND(s.allocation_score * 100.0 / t.total_score, 1) AS pct_resource_allocation,
    ROUND(s.allocation_score * 100.0 / t.total_score * 10, 0) AS headcount_of_100
FROM scored s, total t
ORDER BY allocation_score DESC;


-- ============================================================
-- MODULE 4: GOOGLE ADS EFFICIENCY OVERLAY
-- ============================================================

-- 4A: Full efficiency dashboard
SELECT 
    g.industry AS ads_category,
    g.avg_ctr_pct,
    g.avg_cpc_usd,
    g.avg_cvr_pct,
    g.avg_cpl_usd,
    -- Efficiency metrics
    ROUND(g.avg_ctr_pct * g.avg_cvr_pct / 100.0, 3) AS click_to_lead_rate,
    ROUND(1000.0 / g.avg_cpl_usd, 1) AS leads_per_1000_usd,
    -- Ranking
    RANK() OVER (ORDER BY g.avg_cpl_usd ASC) AS cpl_rank_best_first,
    RANK() OVER (ORDER BY g.avg_cvr_pct DESC) AS cvr_rank_best_first,
    CASE 
        WHEN g.avg_cpl_usd < 40 THEN 'Low Cost'
        WHEN g.avg_cpl_usd < 70 THEN 'Moderate Cost'
        WHEN g.avg_cpl_usd < 100 THEN 'High Cost'
        ELSE 'Very High Cost'
    END AS cost_tier
FROM google_ads_benchmarks g
ORDER BY leads_per_1000_usd DESC;


-- 4B: Alphabet revenue context — how dependent is Google on SMB ads?
SELECT 
    year,
    total_revenue_b,
    google_search_ads_b,
    ROUND(google_search_ads_b * 100.0 / total_revenue_b, 1) AS search_ads_pct_revenue,
    google_search_ads_b + google_network_ads_b + youtube_ads_b AS total_ads_revenue_b,
    ROUND((google_search_ads_b + google_network_ads_b + youtube_ads_b) * 100.0 / total_revenue_b, 1) AS total_ads_pct_revenue,
    ROUND(google_search_ads_b - LAG(google_search_ads_b) OVER (ORDER BY year), 1) AS search_ads_yoy_change_b,
    ROUND((google_search_ads_b - LAG(google_search_ads_b) OVER (ORDER BY year)) * 100.0 / 
          NULLIF(LAG(google_search_ads_b) OVER (ORDER BY year), 0), 1) AS search_ads_yoy_growth_pct
FROM alphabet_financials
ORDER BY year;


-- 4C: Combined view — the "GCS Strategy Briefing"
SELECT 
    p.industry,
    p.priority_quadrant,
    p.total_small_businesses,
    p.avg_payroll_per_firm,
    p.google_ads_category,
    p.avg_cpc_usd,
    p.avg_cpl_usd,
    p.avg_cvr_pct,
    ROUND(1000.0 / NULLIF(p.avg_cpl_usd, 0), 1) AS leads_per_1000,
    -- Strategic recommendation
    CASE 
        WHEN p.priority_quadrant = 'Core' AND p.avg_cpc_usd < 4.0 THEN 'INVEST HEAVILY — high volume, high value, low cost'
        WHEN p.priority_quadrant = 'Core' AND p.avg_cpc_usd >= 4.0 THEN 'OPTIMIZE — high volume but watch CPC efficiency'
        WHEN p.priority_quadrant = 'Growth' THEN 'EXPAND — high value, grow penetration'
        WHEN p.priority_quadrant = 'Scale' THEN 'AUTOMATE — high volume, lower margins, self-serve'
        ELSE 'MONITOR — niche, selective investment'
    END AS strategic_recommendation
FROM portfolio_analysis p
WHERE p.avg_cpc_usd IS NOT NULL
ORDER BY 
    CASE p.priority_quadrant 
        WHEN 'Core' THEN 1 
        WHEN 'Growth' THEN 2 
        WHEN 'Scale' THEN 3 
        ELSE 4 
    END,
    p.total_small_businesses DESC;
