# 360° Business Intelligence Project - End-to-End Solution

A comprehensive Business Intelligence solution that combines Sales, HR, and Finance data to deliver both internal operational dashboards and external executive reports using modern web technologies.

## 🎯 Project Overview

This project demonstrates a complete BI pipeline from data generation through executive reporting, simulating real-world business intelligence scenarios with interactive dashboards built using React, SQL, and modern data visualization libraries.

## ✨ Key Features

### 📊 Internal BI Dashboard (Power BI Simulation)
- **Sales Analytics**: Revenue trends, regional performance, top products
- **HR Analytics**: Headcount, attrition rates, salary trends  
- **Finance Analytics**: Budget vs actual, profit margins, cost analysis
- **Interactive Filtering**: By region and time period
- **Responsive Design**: Works on desktop and mobile

### 📈 Executive Report (Tableau Simulation)
- **Strategic KPIs**: Revenue growth, profit margin, ROI, market share
- **Business Health Scorecard**: Performance indicators vs targets
- **Geographic Distribution**: Revenue by region with growth rates
- **Competitive Analysis**: Market positioning visualization
- **Single-Screen Design**: Perfect for boardroom presentations

## 🚀 Quick Start

### Prerequisites
- Node.js 20.18.0+
- Python 3.11+
- SQLite 3.37+

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd bi_project
```

2. **Generate and process data**
```bash
python generate_data.py
python clean_data.py
python sql/create_db.py
```

3. **Start Internal Dashboard**
```bash
cd dashboards/internal-bi-dashboard
npm install
npm run dev --host
```

4. **Start Executive Report** (in new terminal)
```bash
cd reports/executive-report
npm install
npm run dev --host --port 5174
```

### Access Applications
- **Internal Dashboard**: http://localhost:5173
- **Executive Report**: http://localhost:5174

## 📁 Project Structure

```
bi_project/
├── data/
│   ├── raw/                    # Generated synthetic datasets
│   └── cleaned/                # Processed data files
├── sql/                        # Database scripts and KPI queries
├── dashboards/
│   └── internal-bi-dashboard/  # React app (Power BI simulation)
├── reports/
│   └── executive-report/       # React app (Tableau simulation)
├── documentation/              # Comprehensive project docs
│   ├── project_summary.md      # Executive summary
│   ├── technical_guide.md      # Implementation details
│   └── user_guide.md          # User instructions
└── README.md                   # This file
```

## 📊 Data Overview

### Generated Datasets
- **Sales Data**: 5,000 records with orders, products, revenue, regions
- **HR Data**: 305 employee records with departments, salaries, attrition
- **Finance Data**: 600 budget vs actual records across categories

### Key Metrics
- **Total Revenue**: $53.4M (+12.5% growth)
- **Profit Margin**: 24.1%
- **ROI**: 15.8%
- **Employee Count**: 305 (20% attrition rate)
- **Geographic Coverage**: 5 regions globally

## 🛠 Technology Stack

### Frontend
- **React 18**: Modern JavaScript framework
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Component library
- **Recharts**: Data visualization
- **Lucide Icons**: Modern iconography

### Backend
- **SQLite**: Database storage
- **Python**: Data processing
- **Pandas**: Data manipulation

### Development
- **Vite**: Build tool and dev server
- **Node.js**: Runtime environment
- **npm/pnpm**: Package management

## 📈 Key Performance Indicators

### Sales KPIs
- Revenue Growth Rate (YoY)
- Monthly Sales Trends
- Regional Performance
- Top Products by Revenue

### HR KPIs  
- Employee Headcount by Department
- Attrition Rate Analysis
- Average Salary Trends
- Workforce Productivity

### Finance KPIs
- Budget vs Actual Variance
- Profit Margin by Region
- Cost per Employee
- Return on Investment

## 🎨 Dashboard Features

### Internal BI Dashboard
- **Multi-tab Interface**: Separate views for Sales, HR, Finance
- **Interactive Charts**: Hover effects, clickable legends
- **Dynamic Filtering**: Region and time period controls
- **KPI Cards**: Key metrics with trend indicators
- **Responsive Layout**: Mobile-friendly design

### Executive Report
- **Single-Screen Layout**: All key metrics visible at once
- **Color-Coded KPIs**: Visual status indicators
- **Business Health Scorecard**: Performance vs targets
- **Geographic Visualization**: Revenue distribution map
- **Professional Styling**: Boardroom-ready presentation

## 📚 Documentation

- **[Project Summary](documentation/project_summary.md)**: Executive overview and business insights
- **[Technical Guide](documentation/technical_guide.md)**: Implementation and deployment details
- **[User Guide](documentation/user_guide.md)**: How to use the dashboards effectively

## 🔧 Development

### Running in Development Mode
```bash
# Internal Dashboard
cd dashboards/internal-bi-dashboard
npm run dev

# Executive Report  
cd reports/executive-report
npm run dev -- --port 5174
```

### Building for Production
```bash
# Build both applications
cd dashboards/internal-bi-dashboard && npm run build
cd ../../reports/executive-report && npm run build
```

## 🚀 Deployment Options

### Local Development
- Use built-in Vite dev server
- SQLite database for data storage
- Hot reload for development

### Production Deployment
- Build static files with `npm run build`
- Deploy to web server (Nginx, Apache)
- Consider PostgreSQL for production database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

