# Population Density and COVID-19 Vaccination Rates Web Mapping

This project contains interactive web maps visualizing geographic data using Mapbox GL JS.

## Project Description

This repository includes two interactive choropleth maps:

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

## File Structure

```
Population-Density-Web-Mapping/
├── index.html                          # Main map: Washington COVID-19 vaccination rates
├── pop_density.html                    # U.S. population density map
├── README.md                           # Project documentation
└── assets/
    ├── state_data.geojson              # U.S. state boundaries and population density
    └── wa-covid-data-102521.geojson    # Washington county boundaries and COVID-19 data
```

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

## Color Schemes

### Population Density
- Light Yellow (#FFEDA0): 0-10 people/sq mi
- Yellow (#FED976): 10-20 people/sq mi
- Orange (#FEB24C): 20-50 people/sq mi
- Dark Orange (#FD8D3C): 50-100 people/sq mi
- Red (#FC4E2A): 100-200 people/sq mi
- Dark Red (#E31A1C): 200-500 people/sq mi
- Darker Red (#BD0026): 500-1000 people/sq mi
- Darkest Red (#800026): 1000+ people/sq mi

### Washington COVID-19 Vaccination Rates
- Light Beige (#fee5d9): 0-20% vaccinated
- Light Red (#fcae91): 20-30% vaccinated
- Medium Red (#fb6a4a): 30-40% vaccinated
- Dark Red (#de2d26): 40-50% vaccinated
- Darker Red (#a50f15): 50-60% vaccinated
- Darkest Red (#67000d): 60%+ vaccinated

## Technologies Used

- **Mapbox GL JS v2.5.0**: Interactive map library
- **GeoJSON**: Geographic data format
- **HTML/CSS/JavaScript**: Web technologies

## Author

Created as part of a geospatial web mapping course.

## License

This project uses open geospatial data from the U.S. Census Bureau and public health data sources.