import React, { useState } from 'react';
import './App.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Briefcase, Calendar, Filter } from 'lucide-react';
import { salesData, regionSales, topProducts, hrData, financeData } from './data/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function App() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('2023');

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Internal Business Intelligence Dashboard</h1>
          <p className="text-gray-600">Operations, HR, and Finance Analytics</p>
          
          {/* Filters */}
          <div className="flex gap-4 mt-4">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north-america">North America</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                <SelectItem value="latin-america">Latin America</SelectItem>
                <SelectItem value="middle-east-africa">Middle East & Africa</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="q4-2023">Q4 2023</SelectItem>
                <SelectItem value="q3-2023">Q3 2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="hr">HR Analytics</TabsTrigger>
            <TabsTrigger value="finance">Finance Analytics</TabsTrigger>
          </TabsList>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(53400000)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5% from last year
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.3%</div>
                  <p className="text-xs text-muted-foreground">Average monthly growth</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Region</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">North America</div>
                  <p className="text-xs text-muted-foreground">35% of total revenue</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5,000</div>
                  <p className="text-xs text-muted-foreground">Total orders processed</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue Trend</CardTitle>
                  <CardDescription>Revenue performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Region</CardTitle>
                  <CardDescription>Regional performance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={regionSales}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {regionSales.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Top Products by Revenue</CardTitle>
                  <CardDescription>Best performing products</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProducts}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="product" />
                      <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                      <Bar dataKey="revenue" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* HR Tab */}
          <TabsContent value="hr" className="space-y-6">
            {/* HR KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{hrData.totalEmployees}</div>
                  <p className="text-xs text-muted-foreground">
                    {hrData.activeEmployees} active employees
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attrition Rate</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercent(hrData.attritionRate)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-600">Above industry average</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Salary</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(96000)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +8.2% from last year
                    </span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Largest Dept</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Engineering</div>
                  <p className="text-xs text-muted-foreground">95 employees (39%)</p>
                </CardContent>
              </Card>
            </div>

            {/* HR Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Headcount</CardTitle>
                  <CardDescription>Employee distribution by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hrData.departmentHeadcount}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="headcount" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Salary Trend</CardTitle>
                  <CardDescription>Monthly salary progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hrData.salaryTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'Avg Salary']} />
                      <Line type="monotone" dataKey="avgSalary" stroke="#FF8042" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance" className="space-y-6">
            {/* Finance KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ROI</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatPercent(financeData.roi)}</div>
                  <p className="text-xs text-muted-foreground">Return on Investment</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cost per Employee</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(financeData.costPerEmployee)}</div>
                  <p className="text-xs text-muted-foreground">Annual cost per employee</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24.1%</div>
                  <p className="text-xs text-muted-foreground">December 2023</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Variance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2.7%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">Above budget</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Finance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget vs Actual</CardTitle>
                  <CardDescription>Performance against budget by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={financeData.budgetVsActual}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                      <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                      <Tooltip formatter={(value) => [formatCurrency(value)]} />
                      <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                      <Bar dataKey="actual" fill="#82ca9d" name="Actual" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Profit Margin</CardTitle>
                  <CardDescription>Profit margin trend over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={financeData.monthlyProfitMargin}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Profit Margin']} />
                      <Line type="monotone" dataKey="margin" stroke="#FFBB28" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Budget Variance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Variance Analysis</CardTitle>
                <CardDescription>Detailed variance analysis by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Category</th>
                        <th className="text-right p-2">Budget</th>
                        <th className="text-right p-2">Actual</th>
                        <th className="text-right p-2">Variance</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financeData.budgetVsActual.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{item.category}</td>
                          <td className="text-right p-2">{formatCurrency(item.budget)}</td>
                          <td className="text-right p-2">{formatCurrency(item.actual)}</td>
                          <td className="text-right p-2">{formatPercent(item.variance)}</td>
                          <td className="text-center p-2">
                            <Badge variant={item.variance > 0 ? "default" : "secondary"}>
                              {item.variance > 0 ? "Over" : "Under"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;

