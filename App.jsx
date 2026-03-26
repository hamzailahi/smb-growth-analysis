import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell, PieChart, Pie, LineChart, Line, Legend, ReferenceLine, Treemap } from "recharts";

const DATA = {"portfolio": [{"industry": "Professional, Scientific, and Technical Services", "naics_prefix": "54", "total_small_businesses": 4688321, "employer_firms_small": 856763, "firms_no_employees": 3831558, "firms_1_to_19": 805237, "firms_20_to_499": 51526, "employees_at_small_biz": 5406594, "payroll_small_thousands": 478955789.0, "avg_payroll_per_firm": 559029.0, "avg_payroll_per_employee": 88587.0, "avg_employees_per_firm": 6.3, "google_ads_category": "Business Services", "avg_ctr_pct": 5.65, "avg_cpc_usd": 5.37, "avg_cvr_pct": 5.31, "avg_cpl_usd": 101.13, "market_opportunity_score": 873058.0, "spending_capacity_tier": "Medium", "volume_tier": "Very High", "priority_quadrant": "Core"}, {"industry": "Transportation and Warehousing", "naics_prefix": "48-49", "total_small_businesses": 3822271, "employer_firms_small": 222539, "firms_no_employees": 3599732, "firms_1_to_19": 199970, "firms_20_to_499": 22569, "employees_at_small_biz": 1906662, "payroll_small_thousands": 95064102.0, "avg_payroll_per_firm": 427180.0, "avg_payroll_per_employee": 49859.0, "avg_employees_per_firm": 8.6, "google_ads_category": "Business Services", "avg_ctr_pct": 5.65, "avg_cpc_usd": 5.37, "avg_cvr_pct": 5.31, "avg_cpl_usd": 101.13, "market_opportunity_score": 711782.0, "spending_capacity_tier": "Medium", "volume_tier": "Very High", "priority_quadrant": "Core"}, {"industry": "Other Services (except Public Administration)", "naics_prefix": "81", "total_small_businesses": 3651673, "employer_firms_small": 716043, "firms_no_employees": 2935630, "firms_1_to_19": 675946, "firms_20_to_499": 40097, "employees_at_small_biz": 4357196, "payroll_small_thousands": 166089317.0, "avg_payroll_per_firm": 231954.0, "avg_payroll_per_employee": 38118.0, "avg_employees_per_firm": 6.1, "google_ads_category": "Personal Services", "avg_ctr_pct": 7.69, "avg_cpc_usd": 4.15, "avg_cvr_pct": 10.11, "avg_cpl_usd": 41.05, "market_opportunity_score": 879921.0, "spending_capacity_tier": "Low", "volume_tier": "Very High", "priority_quadrant": "Scale"}, {"industry": "Construction", "naics_prefix": "23", "total_small_businesses": 3550170, "employer_firms_small": 763380, "firms_no_employees": 2786790, "firms_1_to_19": 702944, "firms_20_to_499": 60436, "employees_at_small_biz": 5760866, "payroll_small_thousands": 375789811.0, "avg_payroll_per_firm": 492271.0, "avg_payroll_per_employee": 65231.0, "avg_employees_per_firm": 7.5, "google_ads_category": "Home & Home Improvement", "avg_ctr_pct": 6.37, "avg_cpc_usd": 6.11, "avg_cvr_pct": 10.22, "avg_cpl_usd": 59.8, "market_opportunity_score": 581043.0, "spending_capacity_tier": "Medium", "volume_tier": "Very High", "priority_quadrant": "Core"}, {"industry": "Real Estate and Rental and Leasing", "naics_prefix": "53", "total_small_businesses": 3430500, "employer_firms_small": 356018, "firms_no_employees": 3074482, "firms_1_to_19": 343642, "firms_20_to_499": 12376, "employees_at_small_biz": 1477942, "payroll_small_thousands": 92318239.0, "avg_payroll_per_firm": 259308.0, "avg_payroll_per_employee": 62464.0, "avg_employees_per_firm": 4.2, "google_ads_category": "Real Estate", "avg_ctr_pct": 8.43, "avg_cpc_usd": 1.81, "avg_cvr_pct": 3.52, "avg_cpl_usd": 51.42, "market_opportunity_score": 1895304.0, "spending_capacity_tier": "Low", "volume_tier": "Very High", "priority_quadrant": "Scale"}, {"industry": "Retail Trade", "naics_prefix": "44-45", "total_small_businesses": 3013566, "employer_firms_small": 643586, "firms_no_employees": 2369980, "firms_1_to_19": 589130, "firms_20_to_499": 54456, "employees_at_small_biz": 5306072, "payroll_small_thousands": 228421190.0, "avg_payroll_per_firm": 354919.0, "avg_payroll_per_employee": 43049.0, "avg_employees_per_firm": 8.2, "google_ads_category": "Shopping, Collectibles & Gifts", "avg_ctr_pct": 8.92, "avg_cpc_usd": 1.63, "avg_cvr_pct": 3.69, "avg_cpl_usd": 44.15, "market_opportunity_score": 1848813.0, "spending_capacity_tier": "Medium", "volume_tier": "Very High", "priority_quadrant": "Core"}, {"industry": "Administrative, Support, and Waste Management", "naics_prefix": "56", "total_small_businesses": 2974150, "employer_firms_small": 366150, "firms_no_employees": 2608000, "firms_1_to_19": 328181, "firms_20_to_499": 37969, "employees_at_small_biz": 3710444, "payroll_small_thousands": 175887700.0, "avg_payroll_per_firm": 480371.0, "avg_payroll_per_employee": 47403.0, "avg_employees_per_firm": 10.1, "google_ads_category": "Business Services", "avg_ctr_pct": 5.65, "avg_cpc_usd": 5.37, "avg_cvr_pct": 5.31, "avg_cpl_usd": 101.13, "market_opportunity_score": 553845.0, "spending_capacity_tier": "Medium", "volume_tier": "Very High", "priority_quadrant": "Core"}, {"industry": "Health Care and Social Assistance", "naics_prefix": "62", "total_small_businesses": 2802509, "employer_firms_small": 678459, "firms_no_employees": 2124050, "firms_1_to_19": 587848, "firms_20_to_499": 90611, "employees_at_small_biz": 9037964, "payroll_small_thousands": 431089453.0, "avg_payroll_per_firm": 635395.0, "avg_payroll_per_employee": 47698.0, "avg_employees_per_firm": 13.3, "google_ads_category": "Health & Fitness", "avg_ctr_pct": 7.18, "avg_cpc_usd": 4.18, "avg_cvr_pct": 8.4, "avg_cpl_usd": 49.76, "market_opportunity_score": 670457.0, "spending_capacity_tier": "High", "volume_tier": "Very High", "priority_quadrant": "Core"}, {"industry": "Arts, Entertainment, and Recreation", "naics_prefix": "71", "total_small_businesses": 1655660, "employer_firms_small": 142071, "firms_no_employees": 1513589, "firms_1_to_19": 128290, "firms_20_to_499": 13781, "employees_at_small_biz": 1217971, "payroll_small_thousands": 60749557.0, "avg_payroll_per_firm": 427600.0, "avg_payroll_per_employee": 49878.0, "avg_employees_per_firm": 8.6, "google_ads_category": "Arts & Entertainment", "avg_ctr_pct": 13.1, "avg_cpc_usd": 1.72, "avg_cvr_pct": 6.7, "avg_cpl_usd": 25.67, "market_opportunity_score": 962593.0, "spending_capacity_tier": "Medium", "volume_tier": "High", "priority_quadrant": "Core"}, {"industry": "Accommodation and Food Services", "naics_prefix": "72", "total_small_businesses": 1126519, "employer_firms_small": 555280, "firms_no_employees": 571239, "firms_1_to_19": 450889, "firms_20_to_499": 104391, "employees_at_small_biz": 7491128, "payroll_small_thousands": 188376564.0, "avg_payroll_per_firm": 339246.0, "avg_payroll_per_employee": 25147.0, "avg_employees_per_firm": 13.5, "google_ads_category": "Restaurants & Food", "avg_ctr_pct": 7.58, "avg_cpc_usd": 1.95, "avg_cvr_pct": 5.06, "avg_cpl_usd": 38.55, "market_opportunity_score": 577702.0, "spending_capacity_tier": "Medium", "volume_tier": "High", "priority_quadrant": "Core"}, {"industry": "Finance and Insurance", "naics_prefix": "52", "total_small_businesses": 1004486, "employer_firms_small": 243598, "firms_no_employees": 760888, "firms_1_to_19": 228351, "firms_20_to_499": 15247, "employees_at_small_biz": 1874788, "payroll_small_thousands": 196887231.0, "avg_payroll_per_firm": 808247.0, "avg_payroll_per_employee": 105018.0, "avg_employees_per_firm": 7.7, "google_ads_category": "Finance & Insurance", "avg_ctr_pct": 8.33, "avg_cpc_usd": 4.01, "avg_cvr_pct": 4.11, "avg_cpl_usd": 97.58, "market_opportunity_score": 250495.0, "spending_capacity_tier": "High", "volume_tier": "High", "priority_quadrant": "Core"}, {"industry": "Educational Services", "naics_prefix": "61", "total_small_businesses": 913699, "employer_firms_small": 98983, "firms_no_employees": 814716, "firms_1_to_19": 80910, "firms_20_to_499": 18073, "employees_at_small_biz": 1631945, "payroll_small_thousands": 66558314.0, "avg_payroll_per_firm": 672422.0, "avg_payroll_per_employee": 40785.0, "avg_employees_per_firm": 16.5, "google_ads_category": "Education & Instruction", "avg_ctr_pct": 5.74, "avg_cpc_usd": 4.44, "avg_cvr_pct": 7.07, "avg_cpl_usd": 62.8, "market_opportunity_score": 205788.0, "spending_capacity_tier": "High", "volume_tier": "Medium", "priority_quadrant": "Growth"}, {"industry": "Wholesale Trade", "naics_prefix": "42", "total_small_businesses": 664634, "employer_firms_small": 277469, "firms_no_employees": 387165, "firms_1_to_19": 239705, "firms_20_to_499": 37764, "employees_at_small_biz": 3179732, "payroll_small_thousands": 229443462.0, "avg_payroll_per_firm": 826916.0, "avg_payroll_per_employee": 72158.0, "avg_employees_per_firm": 11.5, "google_ads_category": "Industrial & Commercial", "avg_ctr_pct": 6.23, "avg_cpc_usd": 4.18, "avg_cvr_pct": 3.37, "avg_cpl_usd": 124.03, "market_opportunity_score": 159003.0, "spending_capacity_tier": "High", "volume_tier": "Medium", "priority_quadrant": "Growth"}, {"industry": "Manufacturing", "naics_prefix": "31-33", "total_small_businesses": 603348, "employer_firms_small": 234931, "firms_no_employees": 368417, "firms_1_to_19": 179731, "firms_20_to_499": 55200, "employees_at_small_biz": 4806794, "payroll_small_thousands": 277206296.0, "avg_payroll_per_firm": 1179948.0, "avg_payroll_per_employee": 57670.0, "avg_employees_per_firm": 20.5, "google_ads_category": "Industrial & Commercial", "avg_ctr_pct": 6.23, "avg_cpc_usd": 4.18, "avg_cvr_pct": 3.37, "avg_cpl_usd": 124.03, "market_opportunity_score": 144342.0, "spending_capacity_tier": "High", "volume_tier": "Medium", "priority_quadrant": "Growth"}, {"industry": "Information", "naics_prefix": "51", "total_small_businesses": 474499, "employer_firms_small": 86901, "firms_no_employees": 387598, "firms_1_to_19": 77423, "firms_20_to_499": 9478, "employees_at_small_biz": 931406, "payroll_small_thousands": 92590360.0, "avg_payroll_per_firm": 1065469.0, "avg_payroll_per_employee": 99409.0, "avg_employees_per_firm": 10.7, "google_ads_category": "Business Services", "avg_ctr_pct": 5.65, "avg_cpc_usd": 5.37, "avg_cvr_pct": 5.31, "avg_cpl_usd": 101.13, "market_opportunity_score": 88361.0, "spending_capacity_tier": "High", "volume_tier": "Low", "priority_quadrant": "Growth"}, {"industry": "Agriculture, Forestry, Fishing and Hunting", "naics_prefix": "11", "total_small_businesses": 278165, "employer_firms_small": 22486, "firms_no_employees": 255679, "firms_1_to_19": 21146, "firms_20_to_499": 1340, "employees_at_small_biz": 137082, "payroll_small_thousands": 7019172.0, "avg_payroll_per_firm": 312157.0, "avg_payroll_per_employee": 51204.0, "avg_employees_per_firm": 6.1, "google_ads_category": "Industrial & Commercial", "avg_ctr_pct": 6.23, "avg_cpc_usd": 4.18, "avg_cvr_pct": 3.37, "avg_cpl_usd": 124.03, "market_opportunity_score": 66547.0, "spending_capacity_tier": "Medium", "volume_tier": "Low", "priority_quadrant": "Growth"}, {"industry": "Mining, Quarrying, and Oil and Gas Extraction", "naics_prefix": "21", "total_small_businesses": 89739, "employer_firms_small": 16787, "firms_no_employees": 72952, "firms_1_to_19": 14143, "firms_20_to_499": 2644, "employees_at_small_biz": 222976, "payroll_small_thousands": 19723582.0, "avg_payroll_per_firm": 1174932.0, "avg_payroll_per_employee": 88456.0, "avg_employees_per_firm": 13.3, "google_ads_category": "Industrial & Commercial", "avg_ctr_pct": 6.23, "avg_cpc_usd": 4.18, "avg_cvr_pct": 3.37, "avg_cpl_usd": 124.03, "market_opportunity_score": 21469.0, "spending_capacity_tier": "High", "volume_tier": "Low", "priority_quadrant": "Growth"}], "landscape": [{"industry": "Professional, Scientific, and Technical Services", "total_small_businesses": 4688321, "firms_no_employees": 3831558, "firms_1_to_19": 805237, "firms_20_to_499": 51526, "employer_firms_small": 856763, "employees_at_small_biz": 5406594, "payroll_billions": 479.0, "payroll_per_firm": 559029.0, "avg_emp_per_firm": 6.3, "pct_total_emp_at_small": 56.7}, {"industry": "Transportation and Warehousing", "total_small_businesses": 3822271, "firms_no_employees": 3599732, "firms_1_to_19": 199970, "firms_20_to_499": 22569, "employer_firms_small": 222539, "employees_at_small_biz": 1906662, "payroll_billions": 95.1, "payroll_per_firm": 427180.0, "avg_emp_per_firm": 8.6, "pct_total_emp_at_small": 33.5}, {"industry": "Other Services (except Public Administration)", "total_small_businesses": 3651673, "firms_no_employees": 2935630, "firms_1_to_19": 675946, "firms_20_to_499": 40097, "employer_firms_small": 716043, "employees_at_small_biz": 4357196, "payroll_billions": 166.1, "payroll_per_firm": 231954.0, "avg_emp_per_firm": 6.1, "pct_total_emp_at_small": 85.3}, {"industry": "Construction", "total_small_businesses": 3550170, "firms_no_employees": 2786790, "firms_1_to_19": 702944, "firms_20_to_499": 60436, "employer_firms_small": 763380, "employees_at_small_biz": 5760866, "payroll_billions": 375.8, "payroll_per_firm": 492271.0, "avg_emp_per_firm": 7.5, "pct_total_emp_at_small": 81.6}, {"industry": "Real Estate and Rental and Leasing", "total_small_businesses": 3430500, "firms_no_employees": 3074482, "firms_1_to_19": 343642, "firms_20_to_499": 12376, "employer_firms_small": 356018, "employees_at_small_biz": 1477942, "payroll_billions": 92.3, "payroll_per_firm": 259308.0, "avg_emp_per_firm": 4.2, "pct_total_emp_at_small": 67.8}, {"industry": "Retail Trade", "total_small_businesses": 3013566, "firms_no_employees": 2369980, "firms_1_to_19": 589130, "firms_20_to_499": 54456, "employer_firms_small": 643586, "employees_at_small_biz": 5306072, "payroll_billions": 228.4, "payroll_per_firm": 354919.0, "avg_emp_per_firm": 8.2, "pct_total_emp_at_small": 34.2}, {"industry": "Administrative, Support, and Waste Management", "total_small_businesses": 2974150, "firms_no_employees": 2608000, "firms_1_to_19": 328181, "firms_20_to_499": 37969, "employer_firms_small": 366150, "employees_at_small_biz": 3710444, "payroll_billions": 175.9, "payroll_per_firm": 480371.0, "avg_emp_per_firm": 10.1, "pct_total_emp_at_small": 29.7}, {"industry": "Health Care and Social Assistance", "total_small_businesses": 2802509, "firms_no_employees": 2124050, "firms_1_to_19": 587848, "firms_20_to_499": 90611, "employer_firms_small": 678459, "employees_at_small_biz": 9037964, "payroll_billions": 431.1, "payroll_per_firm": 635395.0, "avg_emp_per_firm": 13.3, "pct_total_emp_at_small": 43.7}, {"industry": "Arts, Entertainment, and Recreation", "total_small_businesses": 1655660, "firms_no_employees": 1513589, "firms_1_to_19": 128290, "firms_20_to_499": 13781, "employer_firms_small": 142071, "employees_at_small_biz": 1217971, "payroll_billions": 60.7, "payroll_per_firm": 427600.0, "avg_emp_per_firm": 8.6, "pct_total_emp_at_small": 65.5}, {"industry": "Accommodation and Food Services", "total_small_businesses": 1126519, "firms_no_employees": 571239, "firms_1_to_19": 450889, "firms_20_to_499": 104391, "employer_firms_small": 555280, "employees_at_small_biz": 7491128, "payroll_billions": 188.4, "payroll_per_firm": 339246.0, "avg_emp_per_firm": 13.5, "pct_total_emp_at_small": 61.7}, {"industry": "Finance and Insurance", "total_small_businesses": 1004486, "firms_no_employees": 760888, "firms_1_to_19": 228351, "firms_20_to_499": 15247, "employer_firms_small": 243598, "employees_at_small_biz": 1874788, "payroll_billions": 196.9, "payroll_per_firm": 808247.0, "avg_emp_per_firm": 7.7, "pct_total_emp_at_small": 27.8}, {"industry": "Educational Services", "total_small_businesses": 913699, "firms_no_employees": 814716, "firms_1_to_19": 80910, "firms_20_to_499": 18073, "employer_firms_small": 98983, "employees_at_small_biz": 1631945, "payroll_billions": 66.6, "payroll_per_firm": 672422.0, "avg_emp_per_firm": 16.5, "pct_total_emp_at_small": 46.8}, {"industry": "Wholesale Trade", "total_small_businesses": 664634, "firms_no_employees": 387165, "firms_1_to_19": 239705, "firms_20_to_499": 37764, "employer_firms_small": 277469, "employees_at_small_biz": 3179732, "payroll_billions": 229.4, "payroll_per_firm": 826916.0, "avg_emp_per_firm": 11.5, "pct_total_emp_at_small": 53.7}, {"industry": "Manufacturing", "total_small_businesses": 603348, "firms_no_employees": 368417, "firms_1_to_19": 179731, "firms_20_to_499": 55200, "employer_firms_small": 234931, "employees_at_small_biz": 4806794, "payroll_billions": 277.2, "payroll_per_firm": 1179948.0, "avg_emp_per_firm": 20.5, "pct_total_emp_at_small": 41.0}, {"industry": "Information", "total_small_businesses": 474499, "firms_no_employees": 387598, "firms_1_to_19": 77423, "firms_20_to_499": 9478, "employer_firms_small": 86901, "employees_at_small_biz": 931406, "payroll_billions": 92.6, "payroll_per_firm": 1065469.0, "avg_emp_per_firm": 10.7, "pct_total_emp_at_small": 27.3}, {"industry": "Agriculture, Forestry, Fishing and Hunting", "total_small_businesses": 278165, "firms_no_employees": 255679, "firms_1_to_19": 21146, "firms_20_to_499": 1340, "employer_firms_small": 22486, "employees_at_small_biz": 137082, "payroll_billions": 7.0, "payroll_per_firm": 312157.0, "avg_emp_per_firm": 6.1, "pct_total_emp_at_small": 82.7}, {"industry": "Mining, Quarrying, and Oil and Gas Extraction", "total_small_businesses": 89739, "firms_no_employees": 72952, "firms_1_to_19": 14143, "firms_20_to_499": 2644, "employer_firms_small": 16787, "employees_at_small_biz": 222976, "payroll_billions": 19.7, "payroll_per_firm": 1174932.0, "avg_emp_per_firm": 13.3, "pct_total_emp_at_small": 47.0}, {"industry": "Utilities", "total_small_businesses": 21355, "firms_no_employees": 15053, "firms_1_to_19": 5069, "firms_20_to_499": 1233, "employer_firms_small": 6302, "employees_at_small_biz": 114353, "payroll_billions": 10.4, "payroll_per_firm": 1657365.0, "avg_emp_per_firm": 18.1, "pct_total_emp_at_small": 18.0}, {"industry": "Management of Companies and Enterprises", "total_small_businesses": 18559, "firms_no_employees": 0, "firms_1_to_19": 5589, "firms_20_to_499": 12970, "employer_firms_small": 18559, "employees_at_small_biz": 364519, "payroll_billions": 35.5, "payroll_per_firm": 1913103.0, "avg_emp_per_firm": 19.6, "pct_total_emp_at_small": 10.5}], "ads_benchmarks": [{"industry": "Animals & Pets", "avg_ctr_pct": 6.58, "avg_cpc_usd": 3.13, "avg_cvr_pct": 13.41, "avg_cpl_usd": 23.57}, {"industry": "Arts & Entertainment", "avg_ctr_pct": 13.1, "avg_cpc_usd": 1.72, "avg_cvr_pct": 6.7, "avg_cpl_usd": 25.67}, {"industry": "Physicians & Surgeons", "avg_ctr_pct": 6.73, "avg_cpc_usd": 3.78, "avg_cvr_pct": 13.12, "avg_cpl_usd": 28.8}, {"industry": "Automotive \u2014 Repair, Service & Parts", "avg_ctr_pct": 5.56, "avg_cpc_usd": 3.71, "avg_cvr_pct": 12.61, "avg_cpl_usd": 29.42}, {"industry": "Sports & Recreation", "avg_ctr_pct": 9.19, "avg_cpc_usd": 1.77, "avg_cvr_pct": 5.69, "avg_cpl_usd": 31.1}, {"industry": "Automotive \u2014 For Sale", "avg_ctr_pct": 8.29, "avg_cpc_usd": 2.32, "avg_cvr_pct": 6.76, "avg_cpl_usd": 34.32}, {"industry": "Restaurants & Food", "avg_ctr_pct": 7.58, "avg_cpc_usd": 1.95, "avg_cvr_pct": 5.06, "avg_cpl_usd": 38.55}, {"industry": "Personal Services", "avg_ctr_pct": 7.69, "avg_cpc_usd": 4.15, "avg_cvr_pct": 10.11, "avg_cpl_usd": 41.05}, {"industry": "Travel", "avg_ctr_pct": 8.73, "avg_cpc_usd": 1.63, "avg_cvr_pct": 3.87, "avg_cpl_usd": 42.14}, {"industry": "Beauty & Personal Care", "avg_ctr_pct": 5.71, "avg_cpc_usd": 3.56, "avg_cvr_pct": 8.16, "avg_cpl_usd": 43.63}, {"industry": "Shopping, Collectibles & Gifts", "avg_ctr_pct": 8.92, "avg_cpc_usd": 1.63, "avg_cvr_pct": 3.69, "avg_cpl_usd": 44.15}, {"industry": "Health & Fitness", "avg_ctr_pct": 7.18, "avg_cpc_usd": 4.18, "avg_cvr_pct": 8.4, "avg_cpl_usd": 49.76}, {"industry": "Real Estate", "avg_ctr_pct": 8.43, "avg_cpc_usd": 1.81, "avg_cvr_pct": 3.52, "avg_cpl_usd": 51.42}, {"industry": "Home & Home Improvement", "avg_ctr_pct": 6.37, "avg_cpc_usd": 6.11, "avg_cvr_pct": 10.22, "avg_cpl_usd": 59.8}, {"industry": "Education & Instruction", "avg_ctr_pct": 5.74, "avg_cpc_usd": 4.44, "avg_cvr_pct": 7.07, "avg_cpl_usd": 62.8}, {"industry": "Apparel / Fashion & Jewelry", "avg_ctr_pct": 6.77, "avg_cpc_usd": 2.89, "avg_cvr_pct": 4.49, "avg_cpl_usd": 64.42}, {"industry": "Career & Employment", "avg_ctr_pct": 6.57, "avg_cpc_usd": 3.38, "avg_cvr_pct": 5.19, "avg_cpl_usd": 65.12}, {"industry": "Dentists & Dental Services", "avg_ctr_pct": 5.44, "avg_cpc_usd": 7.1, "avg_cvr_pct": 10.4, "avg_cpl_usd": 68.27}, {"industry": "Finance & Insurance", "avg_ctr_pct": 8.33, "avg_cpc_usd": 4.01, "avg_cvr_pct": 4.11, "avg_cpl_usd": 97.58}, {"industry": "Business Services", "avg_ctr_pct": 5.65, "avg_cpc_usd": 5.37, "avg_cvr_pct": 5.31, "avg_cpl_usd": 101.13}, {"industry": "Furniture", "avg_ctr_pct": 6.11, "avg_cpc_usd": 2.72, "avg_cvr_pct": 2.34, "avg_cpl_usd": 116.24}, {"industry": "Industrial & Commercial", "avg_ctr_pct": 6.23, "avg_cpc_usd": 4.18, "avg_cvr_pct": 3.37, "avg_cpl_usd": 124.03}, {"industry": "Attorneys & Legal Services", "avg_ctr_pct": 5.97, "avg_cpc_usd": 8.94, "avg_cvr_pct": 7.0, "avg_cpl_usd": 127.71}], "attractiveness": [{"industry": "Professional, Scientific, and Technical Services", "total_small_businesses": 4688321, "payroll_per_firm": 559029.0, "pct_total_emp_at_small": 56.7, "volume_score": 100.0, "spending_score": 29.2, "dominance_score": 66.5, "composite": 66.8}, {"industry": "Construction", "total_small_businesses": 3550170, "payroll_per_firm": 492271.0, "pct_total_emp_at_small": 81.6, "volume_score": 75.7, "spending_score": 25.7, "dominance_score": 95.7, "composite": 63.2}, {"industry": "Other Services (except Public Administration)", "total_small_businesses": 3651673, "payroll_per_firm": 231954.0, "pct_total_emp_at_small": 85.3, "volume_score": 77.9, "spending_score": 12.1, "dominance_score": 100.0, "composite": 60.4}, {"industry": "Real Estate and Rental and Leasing", "total_small_businesses": 3430500, "payroll_per_firm": 259308.0, "pct_total_emp_at_small": 67.8, "volume_score": 73.2, "spending_score": 13.6, "dominance_score": 79.5, "composite": 53.9}, {"industry": "Transportation and Warehousing", "total_small_businesses": 3822271, "payroll_per_firm": 427180.0, "pct_total_emp_at_small": 33.5, "volume_score": 81.5, "spending_score": 22.3, "dominance_score": 39.3, "composite": 50.2}, {"industry": "Health Care and Social Assistance", "total_small_businesses": 2802509, "payroll_per_firm": 635395.0, "pct_total_emp_at_small": 43.7, "volume_score": 59.8, "spending_score": 33.2, "dominance_score": 51.2, "composite": 48.3}, {"industry": "Administrative, Support, and Waste Management", "total_small_businesses": 2974150, "payroll_per_firm": 480371.0, "pct_total_emp_at_small": 29.7, "volume_score": 63.4, "spending_score": 25.1, "dominance_score": 34.8, "composite": 42.8}, {"industry": "Retail Trade", "total_small_businesses": 3013566, "payroll_per_firm": 354919.0, "pct_total_emp_at_small": 34.2, "volume_score": 64.3, "spending_score": 18.6, "dominance_score": 40.1, "composite": 42.3}, {"industry": "Arts, Entertainment, and Recreation", "total_small_businesses": 1655660, "payroll_per_firm": 427600.0, "pct_total_emp_at_small": 65.5, "volume_score": 35.3, "spending_score": 22.4, "dominance_score": 76.8, "composite": 41.2}, {"industry": "Manufacturing", "total_small_businesses": 603348, "payroll_per_firm": 1179948.0, "pct_total_emp_at_small": 41.0, "volume_score": 12.9, "spending_score": 61.7, "dominance_score": 48.1, "composite": 38.8}, {"industry": "Management of Companies and Enterprises", "total_small_businesses": 18559, "payroll_per_firm": 1913103.0, "pct_total_emp_at_small": 10.5, "volume_score": 0.4, "spending_score": 100.0, "dominance_score": 12.3, "composite": 38.2}, {"industry": "Wholesale Trade", "total_small_businesses": 664634, "payroll_per_firm": 826916.0, "pct_total_emp_at_small": 53.7, "volume_score": 14.2, "spending_score": 43.2, "dominance_score": 63.0, "composite": 36.5}, {"industry": "Mining, Quarrying, and Oil and Gas Extraction", "total_small_businesses": 89739, "payroll_per_firm": 1174932.0, "pct_total_emp_at_small": 47.0, "volume_score": 1.9, "spending_score": 61.4, "dominance_score": 55.1, "composite": 36.0}, {"industry": "Utilities", "total_small_businesses": 21355, "payroll_per_firm": 1657365.0, "pct_total_emp_at_small": 18.0, "volume_score": 0.5, "spending_score": 86.6, "dominance_score": 21.1, "composite": 35.8}, {"industry": "Accommodation and Food Services", "total_small_businesses": 1126519, "payroll_per_firm": 339246.0, "pct_total_emp_at_small": 61.7, "volume_score": 24.0, "spending_score": 17.7, "dominance_score": 72.3, "composite": 33.9}, {"industry": "Educational Services", "total_small_businesses": 913699, "payroll_per_firm": 672422.0, "pct_total_emp_at_small": 46.8, "volume_score": 19.5, "spending_score": 35.1, "dominance_score": 54.9, "composite": 33.8}, {"industry": "Agriculture, Forestry, Fishing and Hunting", "total_small_businesses": 278165, "payroll_per_firm": 312157.0, "pct_total_emp_at_small": 82.7, "volume_score": 5.9, "spending_score": 16.3, "dominance_score": 97.0, "composite": 32.3}, {"industry": "Finance and Insurance", "total_small_businesses": 1004486, "payroll_per_firm": 808247.0, "pct_total_emp_at_small": 27.8, "volume_score": 21.4, "spending_score": 42.2, "dominance_score": 32.6, "composite": 31.5}, {"industry": "Information", "total_small_businesses": 474499, "payroll_per_firm": 1065469.0, "pct_total_emp_at_small": 27.3, "volume_score": 10.1, "spending_score": 55.7, "dominance_score": 32.0, "composite": 31.5}], "alphabet": [{"year": 2019, "total_revenue_b": 161.9, "google_search_ads_b": 98.1, "total_ads_b": 134.7, "ads_pct": 83.2}, {"year": 2020, "total_revenue_b": 182.5, "google_search_ads_b": 104.1, "total_ads_b": 147.0, "ads_pct": 80.5}, {"year": 2021, "total_revenue_b": 257.6, "google_search_ads_b": 148.9, "total_ads_b": 209.4, "ads_pct": 81.3}, {"year": 2022, "total_revenue_b": 282.8, "google_search_ads_b": 162.5, "total_ads_b": 224.5, "ads_pct": 79.4}, {"year": 2023, "total_revenue_b": 307.4, "google_search_ads_b": 175.0, "total_ads_b": 237.8, "ads_pct": 77.4}, {"year": 2024, "total_revenue_b": 350.0, "google_search_ads_b": 198.1, "total_ads_b": 267.5, "ads_pct": 76.4}], "states": [{"state": "California", "total_small_businesses": 4200000, "smb_employment": 7200000, "pct_private_emp_at_smb": 48.2, "top_smb_industry": "Professional Services"}, {"state": "Texas", "total_small_businesses": 3100000, "smb_employment": 4900000, "pct_private_emp_at_smb": 44.1, "top_smb_industry": "Construction"}, {"state": "Florida", "total_small_businesses": 3000000, "smb_employment": 3800000, "pct_private_emp_at_smb": 44.7, "top_smb_industry": "Professional Services"}, {"state": "New York", "total_small_businesses": 2600000, "smb_employment": 4100000, "pct_private_emp_at_smb": 47.5, "top_smb_industry": "Professional Services"}, {"state": "Illinois", "total_small_businesses": 1400000, "smb_employment": 2500000, "pct_private_emp_at_smb": 43.9, "top_smb_industry": "Professional Services"}, {"state": "Pennsylvania", "total_small_businesses": 1300000, "smb_employment": 2500000, "pct_private_emp_at_smb": 45.3, "top_smb_industry": "Health Care"}, {"state": "Georgia", "total_small_businesses": 1200000, "smb_employment": 1800000, "pct_private_emp_at_smb": 43.6, "top_smb_industry": "Professional Services"}, {"state": "Ohio", "total_small_businesses": 1100000, "smb_employment": 2200000, "pct_private_emp_at_smb": 44.2, "top_smb_industry": "Health Care"}, {"state": "New Jersey", "total_small_businesses": 1100000, "smb_employment": 1700000, "pct_private_emp_at_smb": 44.8, "top_smb_industry": "Professional Services"}, {"state": "Michigan", "total_small_businesses": 1000000, "smb_employment": 1700000, "pct_private_emp_at_smb": 43.5, "top_smb_industry": "Health Care"}, {"state": "North Carolina", "total_small_businesses": 1000000, "smb_employment": 1800000, "pct_private_emp_at_smb": 43.2, "top_smb_industry": "Health Care"}, {"state": "Virginia", "total_small_businesses": 900000, "smb_employment": 1500000, "pct_private_emp_at_smb": 42.8, "top_smb_industry": "Professional Services"}, {"state": "Washington", "total_small_businesses": 800000, "smb_employment": 1400000, "pct_private_emp_at_smb": 44.3, "top_smb_industry": "Professional Services"}, {"state": "Massachusetts", "total_small_businesses": 800000, "smb_employment": 1500000, "pct_private_emp_at_smb": 45.1, "top_smb_industry": "Professional Services"}, {"state": "Colorado", "total_small_businesses": 800000, "smb_employment": 1200000, "pct_private_emp_at_smb": 47.8, "top_smb_industry": "Professional Services"}, {"state": "Arizona", "total_small_businesses": 700000, "smb_employment": 1100000, "pct_private_emp_at_smb": 43.4, "top_smb_industry": "Construction"}, {"state": "Tennessee", "total_small_businesses": 700000, "smb_employment": 1200000, "pct_private_emp_at_smb": 44.0, "top_smb_industry": "Health Care"}, {"state": "Maryland", "total_small_businesses": 700000, "smb_employment": 1100000, "pct_private_emp_at_smb": 44.2, "top_smb_industry": "Professional Services"}, {"state": "Minnesota", "total_small_businesses": 600000, "smb_employment": 1100000, "pct_private_emp_at_smb": 44.6, "top_smb_industry": "Health Care"}, {"state": "Indiana", "total_small_businesses": 600000, "smb_employment": 1100000, "pct_private_emp_at_smb": 43.8, "top_smb_industry": "Manufacturing"}, {"state": "Montana", "total_small_businesses": 140000, "smb_employment": 200000, "pct_private_emp_at_smb": 65.9, "top_smb_industry": "Construction"}, {"state": "Vermont", "total_small_businesses": 90000, "smb_employment": 130000, "pct_private_emp_at_smb": 60.1, "top_smb_industry": "Health Care"}, {"state": "Wyoming", "total_small_businesses": 80000, "smb_employment": 110000, "pct_private_emp_at_smb": 63.2, "top_smb_industry": "Construction"}], "summary": {"total_smb": 34752434, "total_employer_smb": 6274916, "pct_us_employment": 45.9, "total_industries": 19, "core_industries": 9, "growth_industries": 6, "scale_industries": 2}};

const C = {
  core: "#1a73e8", growth: "#34a853", scale: "#fbbc04", niche: "#ea4335",
  bg: "#f8f9fa", text: "#202124", sub: "#5f6368", bdr: "#dadce0", w: "#fff",
};
const QC = { Core: C.core, Growth: C.growth, Scale: C.scale, Niche: C.niche };

const fmt = (n) => n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(0)+"K" : n?.toLocaleString() ?? "—";
const fmtD = (n) => "$" + (n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(0)+"K" : n?.toLocaleString() ?? "0");
const shrt = (s, n=25) => s?.length > n ? s.slice(0,n-3)+"..." : s;

const tabs = ["Overview", "Industry Deep Dive", "Priority Matrix", "Ads Efficiency", "State Analysis"];

const Card = ({ label, value, sub }) => (
  <div style={{ background: C.w, borderRadius: 12, padding: "20px 24px", border: `1px solid ${C.bdr}`, flex: 1, minWidth: 160 }}>
    <div style={{ fontSize: 26, fontWeight: 600, color: C.text }}>{value}</div>
    <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>{label}</div>
    {sub && <div style={{ fontSize: 11, color: C.core, marginTop: 4, fontWeight: 500 }}>{sub}</div>}
  </div>
);

const QB = ({ q }) => (
  <span style={{ background: QC[q]+"18", color: QC[q], padding: "2px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{q}</span>
);

const Insight = ({ title, children }) => (
  <div style={{ background: C.core+"08", borderLeft: `4px solid ${C.core}`, borderRadius: "0 8px 8px 0", padding: "16px 20px", marginTop: 16 }}>
    <div style={{ fontWeight: 600, fontSize: 13, color: C.core, marginBottom: 4 }}>{title}</div>
    <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const Panel = ({ title, subtitle, children }) => (
  <div style={{ background: C.w, borderRadius: 12, padding: 24, border: `1px solid ${C.bdr}`, marginBottom: 24 }}>
    {title && <h3 style={{ margin: "0 0 4px", fontSize: 16, color: C.text }}>{title}</h3>}
    {subtitle && <p style={{ color: C.sub, fontSize: 12, margin: "0 0 16px" }}>{subtitle}</p>}
    {children}
  </div>
);

// ─────────────────── TAB 1: OVERVIEW ───────────────────
const Tab1 = () => {
  const chart = DATA.landscape.slice(0,12).map(d => ({ name: shrt(d.industry), firms: d.total_small_businesses, payB: d.payroll_billions }));
  const qdist = [
    { name:"Core", value: DATA.summary.core_industries, color: C.core },
    { name:"Growth", value: DATA.summary.growth_industries, color: C.growth },
    { name:"Scale", value: DATA.summary.scale_industries, color: C.scale },
    { name:"Niche", value: DATA.portfolio.filter(p=>p.priority_quadrant==="Niche").length, color: C.niche },
  ];
  // Concentration data
  const sorted = [...DATA.landscape].sort((a,b)=>b.total_small_businesses-a.total_small_businesses);
  const total = sorted.reduce((s,d)=>s+d.total_small_businesses,0);
  let cum = 0;
  const concData = sorted.map((d,i) => { cum += d.total_small_businesses; return { idx: i+1, name: shrt(d.industry,18), pct: +(cum/total*100).toFixed(1) }; });

  return (<div>
    <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:32 }}>
      <Card label="Total U.S. Small Businesses" value="34.8M" sub="99.9% of all businesses" />
      <Card label="SMB Employees" value="59.0M" sub="45.9% of private workforce" />
      <Card label="Employer SMBs (GCS target)" value="6.3M" sub="Firms with paid staff" />
      <Card label="Core Priority Industries" value={DATA.summary.core_industries} sub="High volume + high value" />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:24, marginBottom:24 }}>
      <Panel title="SMB Count by Industry (Top 12)">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chart} layout="vertical" margin={{ left:20, right:40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
            <XAxis type="number" tickFormatter={fmt} />
            <YAxis type="category" dataKey="name" width={170} tick={{ fontSize:11 }} />
            <Tooltip formatter={v=>fmt(v)} />
            <Bar dataKey="firms" fill={C.core} radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
        <Insight title="The Concentration Problem">
          The top 5 industries account for 56% of all U.S. small businesses (19.5M firms). 
          Professional Services alone has 4.7M SMBs — more than the bottom 10 industries combined. 
          GCS cannot treat all industries equally. Portfolio prioritization is mandatory.
        </Insight>
      </Panel>
      <div>
        <Panel title="Priority Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart><Pie data={qdist} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4}>
              {qdist.map((d,i) => <Cell key={i} fill={d.color} />)}
            </Pie><Tooltip /><Legend /></PieChart>
          </ResponsiveContainer>
          <div style={{ fontSize:11, color:C.sub, marginTop:8, lineHeight:1.6 }}>
            <b style={{color:C.core}}>Core:</b> Invest heavily<br/>
            <b style={{color:C.growth}}>Growth:</b> Expand penetration<br/>
            <b style={{color:C.scale}}>Scale:</b> Automate, self-serve<br/>
            <b style={{color:C.niche}}>Niche:</b> Selective investment
          </div>
        </Panel>
        <Panel title="Concentration Curve">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={concData} margin={{ top:5, right:20, bottom:5, left:5 }}>
              <XAxis dataKey="idx" tick={{ fontSize:10 }} />
              <YAxis domain={[0,100]} tick={{ fontSize:10 }} tickFormatter={v=>v+"%"} />
              <Tooltip formatter={v=>v+"%"} labelFormatter={v=>`Top ${v} industries`} />
              <ReferenceLine y={80} stroke={C.niche} strokeDasharray="3 3" />
              <ReferenceLine y={50} stroke={C.scale} strokeDasharray="3 3" />
              <Line type="monotone" dataKey="pct" stroke={C.core} strokeWidth={2.5} dot={{ r:3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </div>
  </div>);
};

// ─────────────────── TAB 2: INDUSTRY DEEP DIVE ───────────────────
const Tab2 = () => {
  const [sel, setSel] = useState(null);
  const table = DATA.landscape.map(d => {
    const p = DATA.portfolio.find(p => p.industry === d.industry);
    return { ...d, ...(p||{}) };
  });
  const det = sel ? table.find(d=>d.industry===sel) : null;
  
  // Attractiveness chart
  const attrData = DATA.attractiveness.slice(0,12).map(d => ({
    name: shrt(d.industry, 22),
    volume: +(d.volume_score * 0.4).toFixed(1),
    spending: +(d.spending_score * 0.35).toFixed(1),
    dominance: +(d.dominance_score * 0.25).toFixed(1),
    total: d.composite,
  }));

  return (<div>
    <Panel title="Industry Attractiveness Ranking" subtitle="Composite score: 40% volume + 35% spending capacity + 25% employment dominance">
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={attrData} layout="vertical" margin={{ left:20, right:50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
          <XAxis type="number" domain={[0,100]} />
          <YAxis type="category" dataKey="name" width={160} tick={{ fontSize:10 }} />
          <Tooltip />
          <Bar dataKey="volume" stackId="a" fill={C.core} name="Volume (40%)" />
          <Bar dataKey="spending" stackId="a" fill={C.growth} name="Spending (35%)" />
          <Bar dataKey="dominance" stackId="a" fill={C.scale} name="Dominance (25%)" radius={[0,4,4,0]} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
      <Insight title="What drives attractiveness?">
        Professional Services ranks #1 because it dominates all three dimensions: highest SMB count (4.7M), 
        strong payroll per firm ($559K), and majority employment share (57%). Construction ranks #2 with 
        the highest small-business employment dominance (82% of industry workers are at SMBs).
      </Insight>
    </Panel>
    
    <Panel title="Full Industry Comparison — Click any row for details">
      <div style={{ overflowX:"auto", maxHeight: 450, overflowY: "auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead style={{ position: "sticky", top: 0, background: C.w }}>
            <tr style={{ borderBottom:`2px solid ${C.bdr}` }}>
              {["Industry","Total SMBs","Employer Firms","Avg Emp/Firm","Payroll/Firm","% Emp at SMB","Quadrant"].map(h =>
                <th key={h} style={{ textAlign:"left", padding:"8px 10px", color:C.sub, fontWeight:500, fontSize: 11 }}>{h}</th>
              )}
            </tr>
          </thead>
          <tbody>{table.map((d,i) =>
            <tr key={i} onClick={()=>setSel(d.industry)} style={{ borderBottom:`1px solid ${C.bdr}`, cursor:"pointer",
              background: sel===d.industry ? C.core+"10" : i%2===0 ? C.bg : C.w }}>
              <td style={{ padding:"8px 10px", fontWeight:500, fontSize: 11 }}>{shrt(d.industry,35)}</td>
              <td style={{ padding:"8px 10px" }}>{fmt(d.total_small_businesses)}</td>
              <td style={{ padding:"8px 10px" }}>{fmt(d.employer_firms_small)}</td>
              <td style={{ padding:"8px 10px" }}>{d.avg_emp_per_firm?.toFixed(1) || "—"}</td>
              <td style={{ padding:"8px 10px" }}>{d.payroll_per_firm ? fmtD(d.payroll_per_firm) : "—"}</td>
              <td style={{ padding:"8px 10px" }}>{d.pct_total_emp_at_small ? d.pct_total_emp_at_small+"%" : "—"}</td>
              <td style={{ padding:"8px 10px" }}>{d.priority_quadrant ? <QB q={d.priority_quadrant}/> : "—"}</td>
            </tr>
          )}</tbody>
        </table>
      </div>
    </Panel>

    {det && <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
      <Panel title={det.industry}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <Card label="Total SMBs" value={fmt(det.total_small_businesses)} />
          <Card label="Employer Firms" value={fmt(det.employer_firms_small)} />
          <Card label="SMB Employees" value={fmt(det.employees_at_small_biz)} />
          <Card label="Payroll/Firm" value={det.payroll_per_firm ? fmtD(det.payroll_per_firm) : "N/A"} />
          <Card label="Avg Team Size" value={det.avg_emp_per_firm?.toFixed(1) || "—"} sub="employees per firm" />
          <Card label="Google Ads CPC" value={det.avg_cpc_usd ? "$"+det.avg_cpc_usd.toFixed(2) : "N/A"} />
        </div>
      </Panel>
      <Panel title="Firm Size Distribution">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart><Pie data={[
            { name:"No employees", value:det.firms_no_employees||0, fill:C.bdr },
            { name:"1-19 emp", value:det.firms_1_to_19||0, fill:C.core },
            { name:"20-499 emp", value:det.firms_20_to_499||0, fill:C.growth },
          ]} dataKey="value" cx="50%" cy="50%" outerRadius={85}></ Pie><Tooltip formatter={fmt} /><Legend /></PieChart>
        </ResponsiveContainer>
      </Panel>
    </div>}
  </div>);
};

// ─────────────────── TAB 3: PRIORITY MATRIX ───────────────────
const Tab3 = () => {
  const scatter = DATA.portfolio.filter(d=>d.avg_cpc_usd).map(d => ({
    x:d.total_small_businesses, y:d.avg_payroll_per_firm, name:shrt(d.industry,28),
    full:d.industry, q:d.priority_quadrant, cpc:d.avg_cpc_usd, cpl:d.avg_cpl_usd,
  }));
  
  const recs = DATA.portfolio.filter(d=>d.avg_cpc_usd).sort((a,b)=>b.total_small_businesses-a.total_small_businesses).map(d => ({
    name: shrt(d.industry, 35), firms: d.total_small_businesses, q: d.priority_quadrant,
    payroll: d.avg_payroll_per_firm, cpc: d.avg_cpc_usd,
    rec: d.priority_quadrant==="Core" && d.avg_cpc_usd<4 ? "INVEST HEAVILY" :
         d.priority_quadrant==="Core" ? "OPTIMIZE" :
         d.priority_quadrant==="Growth" ? "EXPAND" :
         d.priority_quadrant==="Scale" ? "AUTOMATE" : "MONITOR",
    rationale: d.priority_quadrant==="Core" && d.avg_cpc_usd<4 ? "High volume, high value, low acquisition cost" :
               d.priority_quadrant==="Core" ? "High volume + value but watch CPC efficiency" :
               d.priority_quadrant==="Growth" ? "High value per firm, grow market penetration" :
               d.priority_quadrant==="Scale" ? "High volume but lower margins — automate" : "Selective, niche investment",
  }));

  return (<div>
    <Panel title="Portfolio Priority Matrix: Volume × Spending Capacity"
           subtitle="X: Total SMBs | Y: Avg payroll per firm (spending proxy) | Color: Priority quadrant | Dashed lines: threshold boundaries">
      <ResponsiveContainer width="100%" height={480}>
        <ScatterChart margin={{ top:20, right:40, bottom:30, left:50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
          <XAxis type="number" dataKey="x" tickFormatter={fmt} label={{ value:"Total Small Businesses →", position:"bottom", offset:10, fill:C.sub, fontSize:12 }} />
          <YAxis type="number" dataKey="y" tickFormatter={v=>fmtD(v)} label={{ value:"Avg Payroll per Firm →", angle:-90, position:"insideLeft", offset:-35, fill:C.sub, fontSize:12 }} />
          <Tooltip content={({active,payload})=>{
            if(!active||!payload?.length) return null;
            const d=payload[0].payload;
            return (<div style={{ background:C.w, border:`1px solid ${C.bdr}`, borderRadius:8, padding:12, fontSize:12, boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
              <div style={{ fontWeight:600, marginBottom:6 }}>{d.full}</div>
              <div>SMBs: {fmt(d.x)} | Payroll/Firm: {fmtD(d.y)}</div>
              <div>Google Ads CPC: ${d.cpc} | CPL: ${d.cpl}</div>
              <div style={{ marginTop:6 }}><QB q={d.q}/></div>
            </div>);
          }} />
          <ReferenceLine y={300000} stroke={C.sub} strokeDasharray="5 5" />
          <ReferenceLine x={1000000} stroke={C.sub} strokeDasharray="5 5" />
          <Scatter data={scatter}>{scatter.map((d,i)=><Cell key={i} fill={QC[d.q]} r={9} />)}</Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <Insight title="How to read this matrix">
        <b>Core (blue, top-right):</b> High volume AND high spending — invest heavily. These 9 industries should receive 70%+ of GCS sales capacity.
        <b> Growth (green, top-left):</b> High value per firm but fewer businesses — targeted expansion.
        <b> Scale (yellow, bottom-right):</b> Many firms but lower spending — automate with self-serve tools.
      </Insight>
    </Panel>

    <Panel title="Strategic Recommendations by Industry">
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead><tr style={{ borderBottom:`2px solid ${C.bdr}` }}>
            {["Industry","SMBs","Payroll/Firm","CPC","Quadrant","Action","Rationale"].map(h=>
              <th key={h} style={{ textAlign:"left", padding:"8px 10px", color:C.sub, fontWeight:500, fontSize:11 }}>{h}</th>
            )}
          </tr></thead>
          <tbody>{recs.map((d,i)=>
            <tr key={i} style={{ borderBottom:`1px solid ${C.bdr}`, background: i%2===0?C.bg:C.w }}>
              <td style={{ padding:"8px 10px", fontWeight:500 }}>{d.name}</td>
              <td style={{ padding:"8px 10px" }}>{fmt(d.firms)}</td>
              <td style={{ padding:"8px 10px" }}>{fmtD(d.payroll)}</td>
              <td style={{ padding:"8px 10px" }}>${d.cpc.toFixed(2)}</td>
              <td style={{ padding:"8px 10px" }}><QB q={d.q}/></td>
              <td style={{ padding:"8px 10px", fontWeight:600, color: d.rec==="INVEST HEAVILY"?C.core : d.rec==="OPTIMIZE"?C.growth : C.sub }}>{d.rec}</td>
              <td style={{ padding:"8px 10px", fontSize:11, color:C.sub }}>{d.rationale}</td>
            </tr>
          )}</tbody>
        </table>
      </div>
    </Panel>
  </div>);
};

// ─────────────────── TAB 4: ADS EFFICIENCY ───────────────────
const Tab4 = () => {
  const adsChart = DATA.ads_benchmarks.map(d => ({
    name: shrt(d.industry,20), cpc:d.avg_cpc_usd, cpl:d.avg_cpl_usd, cvr:d.avg_cvr_pct, ctr:d.avg_ctr_pct,
    lpk: +(1000/d.avg_cpl_usd).toFixed(1),
  })).sort((a,b)=>b.lpk-a.lpk);
  
  const alphaChart = DATA.alphabet.map(d => ({ year:d.year, total:d.total_revenue_b, ads:d.total_ads_b, pct:d.ads_pct }));

  return (<div>
    <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
      <Card label="Avg Google Ads CPC (2025)" value="$5.26" sub="Across all industries" />
      <Card label="Avg Conversion Rate" value="6.96%" sub="Click → Lead" />
      <Card label="Avg Cost per Lead" value="$70.11" sub="Up 5.1% YoY" />
      <Card label="Google Ads Revenue (2024)" value="$268B" sub="76% of Alphabet revenue" />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:24 }}>
      <Panel title="Leads per $1,000 Ad Spend" subtitle="Higher = more efficient. Green > 20, Yellow 10-20, Red < 10">
        <ResponsiveContainer width="100%" height={520}>
          <BarChart data={adsChart.slice(0,16)} layout="vertical" margin={{ left:20, right:40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={140} tick={{ fontSize:10 }} />
            <Tooltip />
            <Bar dataKey="lpk" name="Leads per $1K" radius={[0,4,4,0]}>
              {adsChart.slice(0,16).map((d,i)=> <Cell key={i} fill={d.lpk>20?C.growth:d.lpk>10?C.scale:C.niche} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="CPC vs Conversion Rate" subtitle="Best position: top-left (low cost, high conversion). Bubble color: green < $3, yellow $3-5, red > $5">
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top:20, right:20, bottom:30, left:20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
            <XAxis type="number" dataKey="cpc" label={{ value:"CPC ($) →", position:"bottom", offset:10, fill:C.sub }} />
            <YAxis type="number" dataKey="cvr" label={{ value:"Conversion Rate (%) →", angle:-90, position:"insideLeft", fill:C.sub }} />
            <Tooltip content={({active,payload})=>{
              if(!active||!payload?.length) return null;
              const d=payload[0].payload;
              return (<div style={{ background:C.w, border:`1px solid ${C.bdr}`, borderRadius:8, padding:12, fontSize:12 }}>
                <div style={{ fontWeight:600 }}>{d.name}</div>
                <div>CPC: ${d.cpc} | CVR: {d.cvr}% | CPL: ${d.cpl}</div>
                <div>Leads per $1K: {d.lpk}</div>
              </div>);
            }} />
            <Scatter data={adsChart}>{adsChart.map((d,i)=><Cell key={i} fill={d.cpc<3?C.growth:d.cpc<5?C.scale:C.niche} r={7} />)}</Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <Insight title="Sweet Spot Industries">
          Animals & Pets, Physicians & Surgeons, and Auto Repair combine low CPC (&lt;$4) with high conversion 
          rates (&gt;12%). These are ideal for GCS self-serve onboarding — low friction, high ROI for the SMB.
        </Insight>
      </Panel>
    </div>
    <Panel title="Alphabet Advertising Revenue Trend (2019-2024)" subtitle="Why SMB portfolio optimization matters to Google's bottom line">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={alphaChart} margin={{ top:10, right:40, bottom:10, left:30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
          <XAxis dataKey="year" />
          <YAxis tickFormatter={v=>"$"+v+"B"} />
          <Tooltip formatter={(v,name)=>["$"+v.toFixed(1)+"B", name==="ads"?"Ads Revenue":"Total Revenue"]} />
          <Legend />
          <Line type="monotone" dataKey="total" name="Total Revenue" stroke={C.sub} strokeWidth={2} dot={{ r:4 }} />
          <Line type="monotone" dataKey="ads" name="Ads Revenue" stroke={C.core} strokeWidth={3} dot={{ r:5 }} />
        </LineChart>
      </ResponsiveContainer>
      <Insight title="Google's SMB Dependency">
        Advertising still drives 76% of Alphabet's revenue ($268B in 2024). Google Search Ads alone doubled 
        from $98B (2019) to $198B (2024). SMBs are the volume backbone of this growth engine — GCS exists 
        to ensure this segment keeps expanding. Portfolio optimization = direct top-line impact.
      </Insight>
    </Panel>
  </div>);
};

// ─────────────────── TAB 5: STATE ANALYSIS ───────────────────
const Tab5 = () => {
  const stateChart = DATA.states.sort((a,b)=>b.total_small_businesses-a.total_small_businesses);
  const empChart = [...DATA.states].sort((a,b)=>b.pct_private_emp_at_smb-a.pct_private_emp_at_smb);
  
  return (<div>
    <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:24 }}>
      <Card label="States with Most SMBs" value="CA, TX, FL" sub="4.2M, 3.1M, 3.0M respectively" />
      <Card label="Highest SMB Employment Share" value="Montana" sub="65.9% of private workers at SMBs" />
      <Card label="GCS Priority Markets" value="CA + TX + FL" sub="29% of all U.S. small businesses" />
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, marginBottom:24 }}>
      <Panel title="Small Business Count by State" subtitle="Top 20 states by total SMB count">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={stateChart.slice(0,20)} layout="vertical" margin={{ left:10, right:40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
            <XAxis type="number" tickFormatter={fmt} />
            <YAxis type="category" dataKey="state" width={100} tick={{ fontSize:10 }} />
            <Tooltip formatter={v=>fmt(v)} />
            <Bar dataKey="total_small_businesses" name="Small Businesses" fill={C.core} radius={[0,4,4,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
      <Panel title="SMB Employment Dominance by State" subtitle="% of private sector workers employed by small businesses">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={empChart} layout="vertical" margin={{ left:10, right:40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.bdr} />
            <XAxis type="number" domain={[35,70]} tickFormatter={v=>v+"%"} />
            <YAxis type="category" dataKey="state" width={100} tick={{ fontSize:10 }} />
            <Tooltip formatter={v=>v+"%"} />
            <ReferenceLine x={45.9} stroke={C.niche} strokeDasharray="3 3" label={{ value:"U.S. avg (45.9%)", fill:C.niche, fontSize:10 }} />
            <Bar dataKey="pct_private_emp_at_smb" name="% at SMBs" radius={[0,4,4,0]}>
              {empChart.map((d,i)=><Cell key={i} fill={d.pct_private_emp_at_smb>50?C.growth:d.pct_private_emp_at_smb>45?C.core:C.scale} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </div>
    <Panel title="Geographic Strategy Implications">
      <Insight title="Volume vs Dominance Trade-off">
        California, Texas, and Florida have the most SMBs by raw count — these are GCS's volume markets. 
        But Montana, Wyoming, and Vermont have the highest SMB employment share (60-66%), meaning small 
        businesses are MORE important to those economies. GCS should use volume markets (CA/TX/FL) for 
        scale acquisition and dominance markets (MT/WY/VT/CO) for penetration growth stories.
      </Insight>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginTop:16 }}>
        <div style={{ background:C.core+"08", borderRadius:8, padding:16 }}>
          <div style={{ fontWeight:600, color:C.core, fontSize:13, marginBottom:4 }}>Volume Markets</div>
          <div style={{ fontSize:12, color:C.sub }}>CA · TX · FL · NY · IL</div>
          <div style={{ fontSize:11, color:C.sub, marginTop:4 }}>12.3M SMBs (35% of U.S. total). Focus: scale acquisition, large sales teams.</div>
        </div>
        <div style={{ background:C.growth+"08", borderRadius:8, padding:16 }}>
          <div style={{ fontWeight:600, color:C.growth, fontSize:13, marginBottom:4 }}>Growth Markets</div>
          <div style={{ fontSize:12, color:C.sub }}>CO · WA · MA · VA</div>
          <div style={{ fontSize:11, color:C.sub, marginTop:4 }}>Professional Services heavy. High payroll/firm. Focus: mid-market accounts.</div>
        </div>
        <div style={{ background:C.scale+"08", borderRadius:8, padding:16 }}>
          <div style={{ fontWeight:600, color:C.scale, fontSize:13, marginBottom:4 }}>Penetration Markets</div>
          <div style={{ fontSize:12, color:C.sub }}>MT · WY · VT · rural states</div>
          <div style={{ fontSize:11, color:C.sub, marginTop:4 }}>SMBs dominate economy (60%+). Focus: self-serve tools, digital-first onboarding.</div>
        </div>
      </div>
    </Panel>
  </div>);
};

// ─────────────────── MAIN APP ───────────────────
export default function App() {
  const [tab, setTab] = useState(0);
  return (
    <div style={{ fontFamily:"'Google Sans','Segoe UI',system-ui,sans-serif", background:C.bg, minHeight:"100vh", color:C.text }}>
      <header style={{ background:C.w, borderBottom:`1px solid ${C.bdr}`, padding:"16px 32px", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <h1 style={{ margin:0, fontSize:20, fontWeight:600 }}>SMB Growth Strategy Analysis</h1>
              <p style={{ margin:"2px 0 0", fontSize:12, color:C.sub }}>Google Customer Solutions — Portfolio Prioritization Framework</p>
            </div>
            <div style={{ fontSize:11, color:C.sub, textAlign:"right" }}>Data: Census SUSB 2022 · WordStream 2025 · Alphabet 10-K<br/>By Hamza Ilahi</div>
          </div>
          <nav style={{ display:"flex", gap:4, marginTop:14 }}>
            {tabs.map((t,i) => (
              <button key={i} onClick={()=>setTab(i)} style={{
                padding:"7px 18px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:500,
                background: tab===i?C.core:"transparent", color: tab===i?C.w:C.sub, transition:"all 0.2s"
              }}>{t}</button>
            ))}
          </nav>
        </div>
      </header>
      <main style={{ maxWidth:1200, margin:"0 auto", padding:"24px 32px" }}>
        {tab===0 && <Tab1/>}
        {tab===1 && <Tab2/>}
        {tab===2 && <Tab3/>}
        {tab===3 && <Tab4/>}
        {tab===4 && <Tab5/>}
      </main>
      <footer style={{ textAlign:"center", padding:24, fontSize:11, color:C.sub, borderTop:`1px solid ${C.bdr}`, marginTop:32 }}>
        Sources: U.S. Census Bureau SUSB 2022 · SBA Office of Advocacy 2024 · WordStream Google Ads Benchmarks 2025 · Alphabet 10-K (2019-2024)
        <br/>SQL queries, Python analysis, and React dashboard — <a href="https://github.com/hamzailahi" style={{color:C.core}}>github.com/hamzailahi</a>
      </footer>
    </div>
  );
}