# AI Disclaimer

I used AI in this assignment for some debugging and understanding of the data. I did not use AI to write or complete any components where AI use is prohibited. I am able to explain the relevant code and decisions.
## Project Description

This repository includes two interactive choropleth maps. I chose choropleth maps because I feel they best represent the data for population density and vaccination.:

### 1. Population Density Map (pop_density.html)
Visualizes the population density across U.S. states based on population per square mile. The map uses a color gradient from light yellow (low density) to dark red (high density).

**Data Source:** U.S. Census Bureau

### 2. Washington County COVID-19 Vaccination Rates (index.html)
Displays the fully vaccinated rates across Washington State counties as of October 25, 2021. The map uses a red color scheme where darker red indicates higher vaccination rates.

**Data Sources:**
- Vaccination data: Washington State Department of Health
- COVID-19 case and death data: The New York Times
- Population data: Washington State Office of Financial Management
- Geographic boundaries: U.S. Census Bureau

## Features

Both maps include:
- **Interactive hover effects**: Display detailed information about each geographic area when hovering
- **Color-coded choropleth visualization**: Represents data values through color intensity
- **Informative legend**: Shows the color scale and data ranges
- **Responsive design**: Works on different screen sizes
- **Mapbox base layer**: Uses light map style for clear visibility of data


## How to Access

- **Main map (Vaccination Rates):** https://coysmax.github.io/Population-Density-Web-Mapping/index.html
- **Population Density Map:** https://coysmax.github.io/Population-Density-Web-Mapping/pop_density.html

## Map Attributes

### U.S. Population Density Map
- `name`: State name
- `density`: Population density (people per square mile)

### Washington COVID-19 Data Map
- `name`: County name
- `casePer10k`: Cumulative COVID-19 cases per 10,000 people
- `deathPer10k`: Cumulative COVID-19 deaths per 10,000 people
- `fullyVaxPer10k`: Number of fully vaccinated people per 10,000 people
