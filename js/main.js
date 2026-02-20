// ===== GLOBAL VARIABLES =====
let map;
let covidData = null;
let vaccinationChart = null;
let selectedFeature = null;

const DEFAULT_CENTER = [-120.5, 47.5];
const DEFAULT_ZOOM = 6.5;

// ===== FUNCTIONS =====

/**
 * Load COVID data asynchronously
 */
async function loadData(dataUrl) {
    try {
        showLoadingSpinner(true);
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        covidData = await response.json();
        console.log('COVID data loaded successfully:', covidData);
        return covidData;
    } catch (error) {
        console.error('Error loading data:', error);
        showLoadingSpinner(false);
        alert('Error loading COVID data: ' + error.message);
        return null;
    }
}

/**
 * Show/hide loading spinner
 */
function showLoadingSpinner(show) {
    const spinner = document.getElementById('loadingSpinner');
    if (show) {
        spinner.classList.add('active');
    } else {
        spinner.classList.remove('active');
    }
}

/**
 * Get color based on vaccination rate (Choropleth styling)
 */
function getColor(vaccinationRate) {
    // Convert to percentage if needed
    const rate = vaccinationRate / 100;
    
    if (rate <= 0.20) return '#fee5d9';
    if (rate <= 0.30) return '#fcae91';
    if (rate <= 0.40) return '#fb6a4a';
    if (rate <= 0.50) return '#de2d26';
    if (rate <= 0.60) return '#a50f15';
    return '#67000d';
}

/**
 * Calculate statistics from COVID data
 */
function calculateStats() {
    if (!covidData || !covidData.features) return null;

    const vaccinationRates = covidData.features
        .map(f => (f.properties.fullyVaxPer10k || 0) / 100)
        .filter(d => d > 0);

    const stats = {
        total: covidData.features.length,
        avg: (vaccinationRates.reduce((a, b) => a + b, 0) / vaccinationRates.length).toFixed(1),
        max: (Math.max(...vaccinationRates)).toFixed(1),
        min: (Math.min(...vaccinationRates)).toFixed(1)
    };

    return stats;
}

/**
 * Update statistics panel
 */
function updateStatsPanel() {
    const stats = calculateStats();
    if (!stats) return;

    document.getElementById('totalCounties').textContent = stats.total;
    document.getElementById('avgVaccination').textContent = stats.avg + '%';
    document.getElementById('maxVaccination').textContent = stats.max + '%';
    document.getElementById('minVaccination').textContent = stats.min + '%';

    document.getElementById('statsPanel').classList.add('active');
}

/**
 * Create vaccination distribution chart
 */
function createVaccinationChart(features) {
    const vaccinationBuckets = {
        '0-20%': 0,
        '20-30%': 0,
        '30-40%': 0,
        '40-50%': 0,
        '50-60%': 0,
        '60%+': 0
    };

    features.forEach(f => {
        const rate = (f.properties.fullyVaxPer10k || 0) / 100;
        if (rate <= 20) vaccinationBuckets['0-20%']++;
        else if (rate <= 30) vaccinationBuckets['20-30%']++;
        else if (rate <= 40) vaccinationBuckets['30-40%']++;
        else if (rate <= 50) vaccinationBuckets['40-50%']++;
        else if (rate <= 60) vaccinationBuckets['50-60%']++;
        else vaccinationBuckets['60%+']++;
    });

    const labels = Object.keys(vaccinationBuckets);
    const values = Object.values(vaccinationBuckets);

    const ctx = document.getElementById('vaccinationChart').getContext('2d');

    if (vaccinationChart) {
        vaccinationChart.destroy();
    }

    vaccinationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Counties',
                data: values,
                backgroundColor: ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15', '#67000d'],
                borderColor: '#667eea',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

/**
 * Update info panel with county information
 */
function updateInfoPanel(feature) {
    const props = feature.properties;
    const vaccinationRate = (props.fullyVaxPer10k || 0) / 100;
    const name = props.name || 'Unknown County';

    let html = `
        <h3>${name} County</h3>
        <div class="stat-row">
            <span class="stat-label">Vaccination Rate:</span>
            <span class="stat-value">${vaccinationRate.toFixed(1)}%</span>
        </div>
    `;

    // Add other properties
    Object.keys(props).forEach(key => {
        if (key !== 'name' && key !== 'fullyVaxPer10k') {
            let value = props[key];
            if (typeof value === 'number') {
                value = (value / 100).toFixed(1);
            }
            html += `
                <div class="stat-row">
                    <span class="stat-label">${key}:</span>
                    <span class="stat-value">${value}</span>
                </div>
            `;
        }
    });

    document.getElementById('infoContent').innerHTML = html;
    document.getElementById('chartContainer').style.display = 'block';
}

/**
 * Reset dashboard to initial state
 */
function resetDashboard() {
    map.flyTo({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
    selectedFeature = null;
    document.getElementById('infoContent').innerHTML = '<p>Click on a county to view vaccination details</p>';
    document.getElementById('chartContainer').style.display = 'none';
    console.log('Dashboard reset');
}

/**
 * Initialize the map
 */
function initMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiY295c21heCIsImEiOiJjbWhjeGVxbWQxZjV3MmpwcjlsNGNoc2pkIn0.lN8fMUCO0-cVKDiQW_G7tg';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: DEFAULT_ZOOM,
        center: DEFAULT_CENTER
    });

    console.log('Map initialized');
}

/**
 * Add COVID data layer to map (Choropleth map)
 */
function addCovidLayer() {
    if (!covidData) return;

    map.on('load', () => {
        map.addSource('covid-data', {
            type: 'geojson',
            data: covidData
        });

        map.addLayer({
            id: 'covid-counties',
            type: 'fill',
            source: 'covid-data',
            paint: {
                'fill-color': [
                    'case',
                    ['<=', ['get', 'fullyVaxPer10k'], 2000],
                    '#fee5d9',
                    ['<=', ['get', 'fullyVaxPer10k'], 3000],
                    '#fcae91',
                    ['<=', ['get', 'fullyVaxPer10k'], 4000],
                    '#fb6a4a',
                    ['<=', ['get', 'fullyVaxPer10k'], 5000],
                    '#de2d26',
                    ['<=', ['get', 'fullyVaxPer10k'], 6000],
                    '#a50f15',
                    '#67000d'
                ],
                'fill-opacity': 0.8
            }
        });

        // Add borders
        map.addLayer({
            id: 'covid-counties-border',
            type: 'line',
            source: 'covid-data',
            paint: {
                'line-color': '#999',
                'line-width': 2
            }
        });

        // Click handler
        map.on('click', 'covid-counties', (e) => {
            selectedFeature = e.features[0];
            updateInfoPanel(selectedFeature);
        });

        // Hover effect
        map.on('mouseover', 'covid-counties', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'covid-counties', () => {
            map.getCanvas().style.cursor = '';
        });
    });
}

// ===== EVENT LISTENERS =====
document.getElementById('resetBtn').addEventListener('click', resetDashboard);

// ===== INITIALIZATION =====
window.addEventListener('load', async () => {
    console.log('Starting dashboard initialization...');
    
    initMap();
    
    // Load COVID data asynchronously
    const data = await loadData('assets/wa-covid-data-102521.geojson');
    
    if (data) {
        addCovidLayer();
        updateStatsPanel();
        createVaccinationChart(data.features);
        console.log('Dashboard fully initialized');
    }
    
    showLoadingSpinner(false);
});




