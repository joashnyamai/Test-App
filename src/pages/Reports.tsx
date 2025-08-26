import React, { useState, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, BarChart, Bar,
  AreaChart, Area, ResponsiveContainer 
} from 'recharts';
import { 
  Card, CardContent, CardHeader, CardTitle, CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Calendar, Download, Filter, TrendingUp, Users, Bug, CheckCircle, XCircle } from 'lucide-react';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [projectFilter, setProjectFilter] = useState('all');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  // Mock data for charts
  const testExecutionData = [
    { date: 'Jan 1', passed: 45, failed: 5 },
    { date: 'Jan 2', passed: 52, failed: 8 },
    { date: 'Jan 3', passed: 48, failed: 12 },
    { date: 'Jan 4', passed: 60, failed: 10 },
    { date: 'Jan 5', passed: 55, failed: 5 },
    { date: 'Jan 6', passed: 65, failed: 8 },
    { date: 'Jan 7', passed: 70, failed: 6 },
  ];

  const bugSeverityData = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'High', value: 25, color: '#f97316' },
    { name: 'Medium', value: 38, color: '#eab308' },
    { name: 'Low', value: 45, color: '#22c55e' },
  ];

  const testCoverageData = [
    { module: 'Authentication', coverage: 95, tests: 45 },
    { module: 'Payments', coverage: 82, tests: 38 },
    { module: 'Dashboard', coverage: 88, tests: 52 },
    { module: 'Notifications', coverage: 75, tests: 28 },
    { module: 'Settings', coverage: 90, tests: 40 },
  ];

  const teamPerformanceData = [
    { name: 'Team A', bugs: 12, tests: 150, coverage: 92 },
    { name: 'Team B', bugs: 8, tests: 180, coverage: 88 },
    { name: 'Team C', bugs: 15, tests: 120, coverage: 85 },
    { name: 'Team D', bugs: 5, tests: 200, coverage: 95 },
  ];

  const COLORS_LIGHT = ["#16a34a", "#ef4444", "#f59e0b", "#3b82f6"];
  const COLORS_DARK = ["#22c55e", "#f87171", "#f97316", "#60a5fa"];
  const COLORS = isDark ? COLORS_DARK : COLORS_LIGHT;

  const gridStroke = isDark ? "#374151" : "#e5e7eb";
  const axisStroke = isDark ? "#9ca3af" : "#374151";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive insights into your testing performance and metrics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="ytd">Year to date</SelectItem>
            </SelectContent>
          </Select>

          <Select value={projectFilter} onValueChange={setProjectFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="payments">Payments</SelectItem>
              <SelectItem value="dashboard">Dashboard</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Bugs</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">-8 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">4 teams active</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Execution Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Test Execution Trend</CardTitle>
            <CardDescription>Daily test execution performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={testExecutionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="date" stroke={axisStroke} />
                <YAxis stroke={axisStroke} />
                <Tooltip />
                <Area type="monotone" dataKey="passed" stackId="1" stroke="#16a34a" fill="#16a34a20" />
                <Area type="monotone" dataKey="failed" stackId="1" stroke="#ef4444" fill="#ef444420" />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bug Severity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Bug Severity Distribution</CardTitle>
            <CardDescription>Current open bugs by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bugSeverityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {bugSeverityData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Test Coverage by Module */}
        <Card>
          <CardHeader>
            <CardTitle>Test Coverage</CardTitle>
            <CardDescription>Coverage percentage by module</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={testCoverageData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="module" stroke={axisStroke} />
                <YAxis stroke={axisStroke} />
                <Tooltip />
                <Bar dataKey="coverage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Team Performance Metrics</CardTitle>
            <CardDescription>Comparison across testing teams</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis dataKey="name" stroke={axisStroke} />
                <YAxis stroke={axisStroke} />
                <Tooltip />
                <Legend />
                <Bar dataKey="bugs" fill="#ef4444" name="Bugs" radius={[4, 4, 0, 0]} />
                <Bar dataKey="tests" fill="#3b82f6" name="Tests" radius={[4, 4, 0, 0]} />
                <Bar dataKey="coverage" fill="#16a34a" name="Coverage %" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
