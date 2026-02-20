# AI Disclaimer

Some AI was used for programming ideas and debugging throughout this project. I did not use AI to write or complete any components where AI use is prohibited. I am able to explain the relevant code and decisions.

## Project Description

This repository contains an interactive **COVID-19 Vaccination Smart Dashboard** that visualizes Washington State COVID-19 vaccination rates by county using a choropleth map visualization.

### Why Choropleth Map?

A choropleth map is the ideal visualization choice for this data because:
- **Continuous Data Representation**: Vaccination rates are continuous values (0-100%), and choropleth maps excel at showing continuous data distributions across geographic regions
- **Spatial Pattern Recognition**: Users can instantly identify geographic concentration of vaccination coverage—areas with similar vaccination rates are visually grouped by color intensity
- **Regional Comparisons**: The color gradient makes it easy to compare vaccination coverage between neighboring counties at a glance
- **Data Density**: With 39 counties and 1 rate value per county, a choropleth is more efficient than proportional symbols or individual data points

### Washington State COVID-19 Vaccination Rates

Displays fully vaccinated rates across Washington State counties as of October 25, 2021.

**Data Sources:**
- Vaccination data: Washington State Department of Health
- Population data: Washington State Office of Financial Management
- Geographic boundaries: U.S. Census Bureau

## Features

The dashboard includes:
- **Interactive Choropleth Map**: Color-coded vaccination rates (0%, 20%, 30%, 40%, 50%, 60%+)
- **Statistics Panel**: Dynamic county statistics showing total counties, average/max/min vaccination rates
- **Vaccination Distribution Chart**: Bar chart visualization showing county distribution across vaccination rate brackets
- **County Information Panel**: Click any county to view detailed vaccination data
- **Interactive Legend**: Shows vaccination rate ranges and corresponding colors
- **Responsive Design**: Works on desktop and mobile devices
- **Loading Indicator**: Visual feedback while data loads

## How to Access

**Live Dashboard:** https://coysmax.github.io/Population-Density-Web-Mapping/
