import React from 'react';
import './App.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, Area, AreaChart, ScatterChart, Scatter, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Globe, Users, DollarSign, Target, Award, AlertTriangle, CheckCircle } from 'lucide-react';
import { executiveKPIs, quarterlyPerformance, geographicSales, businessHealth, workforceTrends, competitivePosition } from './data/executiveData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function App() {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value}%`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Executive Dashboard</h1>
              <p className="text-slate-600 text-lg">Strategic Business Intelligence Report • Q4 2023</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{formatCurrency(executiveKPIs.totalRevenue)}</div>
              <div className="text-sm text-slate-600">Total Revenue</div>
              <div className="flex items-center justify-end mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-semibold">+{formatPercent(executiveKPIs.revenueGrowth)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Revenue Growth</p>
                  <p className="text-2xl font-bold">+{formatPercent(executiveKPIs.revenueGrowth)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Profit Margin</p>
                  <p className="text-2xl font-bold">{formatPercent(executiveKPIs.profitMargin)}</p>
                </div>
                <Target className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">ROI</p>
                  <p className="text-2xl font-bold">{formatPercent(executiveKPIs.roi)}</p>
                </div>
                <Award className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Market Share</p>
                  <p className="text-2xl font-bold">{formatPercent(executiveKPIs.marketShare)}</p>
                </div>
                <Globe className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Employees</p>
                  <p className="text-2xl font-bold">{executiveKPIs.employeeCount}</p>
                </div>
                <Users className="w-8 h-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Attrition</p>
                  <p className="text-2xl font-bold">{formatPercent(executiveKPIs.attritionRate)}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm">Satisfaction</p>
                  <p className="text-2xl font-bold">{executiveKPIs.customerSatisfaction}/5</p>
                </div>
                <Award className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-sm">Growth Rate</p>
                  <p className="text-2xl font-bold">+{formatPercent(executiveKPIs.revenueGrowth)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quarterly Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Quarterly Financial Performance
              </CardTitle>
              <CardDescription>Revenue, profit, and margin trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={quarterlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis yAxisId="left" tickFormatter={(value) => `$${value / 1000000}M`} />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'margin') return [`${value}%`, 'Profit Margin'];
                      return [formatCurrency(value), name === 'revenue' ? 'Revenue' : 'Profit'];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="revenue" fill="#3B82F6" name="revenue" />
                  <Bar yAxisId="left" dataKey="profit" fill="#10B981" name="profit" />
                  <Line yAxisId="right" type="monotone" dataKey="margin" stroke="#F59E0B" strokeWidth={3} name="margin" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Business Health Scorecard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Business Health
              </CardTitle>
              <CardDescription>Key performance indicators vs targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessHealth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">{item.metric}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">{item.value}{item.metric.includes('Growth') || item.metric.includes('Margin') || item.metric.includes('ROI') ? '%' : item.metric.includes('Satisfaction') ? '/5' : '%'}</span>
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Sales Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>Revenue by region with growth rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicSales.map((region, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{region.region}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold">{formatCurrency(region.revenue)}</div>
                        <div className="text-xs text-green-600">+{region.growth}%</div>
                      </div>
                    </div>
                    <Progress value={(region.revenue / 18500000) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Workforce Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Workforce Trends
              </CardTitle>
              <CardDescription>Headcount and productivity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ComposedChart data={workforceTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="headcount" fill="#8884d8" name="Headcount" />
                  <Line yAxisId="right" type="monotone" dataKey="productivity" stroke="#82ca9d" strokeWidth={2} name="Productivity %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Competitive Position */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Competitive Position
              </CardTitle>
              <CardDescription>Market share vs revenue and growth</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <ScatterChart data={competitivePosition}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="marketShare" name="Market Share" unit="%" />
                  <YAxis dataKey="revenue" name="Revenue" unit="M" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'Market Share') return [`${value}%`, 'Market Share'];
                      if (name === 'Revenue') return [`$${value}M`, 'Revenue'];
                      return [value, name];
                    }}
                    labelFormatter={(label) => `Company: ${label}`}
                  />
                  <Scatter name="Companies" dataKey="revenue" fill="#8884d8">
                    {competitivePosition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.company === 'Our Company' ? '#FF8042' : '#8884d8'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Executive Dashboard • Generated on {new Date().toLocaleDateString()} • Confidential</p>
        </div>
      </div>
    </div>
  );
}

export default App;

