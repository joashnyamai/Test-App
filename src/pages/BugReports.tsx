import { useState } from "react";
import { Search, Filter, Plus, Eye, Edit, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const bugReports = [
  {
    id: "BUG-001",
    title: "Login button not responsive on mobile",
    severity: "High",
    status: "Open",
    reporter: "John Doe",
    assignedTo: "Dev Team A",
    module: "Authentication",
    reportedDate: "2024-01-15",
    comments: 3
  },
  {
    id: "BUG-002",
    title: "Payment gateway timeout error",
    severity: "Critical",
    status: "In Progress",
    reporter: "Jane Smith",
    assignedTo: "Dev Team B",
    module: "Payment",
    reportedDate: "2024-01-14",
    comments: 7
  },
  {
    id: "BUG-003",
    title: "Search results not loading",
    severity: "Medium",
    status: "Resolved",
    reporter: "Mike Johnson",
    assignedTo: "Dev Team A",
    module: "Search",
    reportedDate: "2024-01-13",
    comments: 2
  },
  {
    id: "BUG-004",
    title: "Cart items disappearing after refresh",
    severity: "High",
    status: "Open",
    reporter: "Sarah Wilson",
    assignedTo: "Dev Team C",
    module: "E-commerce",
    reportedDate: "2024-01-12",
    comments: 5
  },
  {
    id: "BUG-005",
    title: "UI alignment issues in dashboard",
    severity: "Low",
    status: "Closed",
    reporter: "David Brown",
    assignedTo: "UI Team",
    module: "Dashboard",
    reportedDate: "2024-01-11",
    comments: 1
  }
];

export const BugReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <Badge className="status-failed">Critical</Badge>;
      case 'high':
        return <Badge className="status-blocked">High</Badge>;
      case 'medium':
        return <Badge className="bg-primary/10 text-primary border-primary/20">Medium</Badge>;
      case 'low':
        return <Badge className="status-not-run">Low</Badge>;
      default:
        return <Badge className="status-not-run">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Badge className="status-failed">Open</Badge>;
      case 'in progress':
        return <Badge className="status-blocked">In Progress</Badge>;
      case 'resolved':
        return <Badge className="status-passed">Resolved</Badge>;
      case 'closed':
        return <Badge className="status-not-run">Closed</Badge>;
      default:
        return <Badge className="status-not-run">{status}</Badge>;
    }
  };

  const filteredBugs = bugReports.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.module.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || bug.severity.toLowerCase() === severityFilter;
    const matchesStatus = statusFilter === "all" || bug.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bug Reports</h1>
          <p className="text-muted-foreground mt-1">Track and manage reported issues</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-hover">
          <Plus className="w-4 h-4 mr-2" />
          Report Bug
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search bugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bug Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Bug Reports ({filteredBugs.length})</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="w-24">Bug ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-24">Severity</TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-32">Reporter</TableHead>
                <TableHead className="w-32">Assigned To</TableHead>
                <TableHead className="w-32">Module</TableHead>
                <TableHead className="w-28">Reported</TableHead>
                <TableHead className="w-32">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBugs.map((bug) => (
                <TableRow key={bug.id} className="table-row">
                  <TableCell className="font-medium text-primary">{bug.id}</TableCell>
                  <TableCell className="font-medium">{bug.title}</TableCell>
                  <TableCell>{getSeverityBadge(bug.severity)}</TableCell>
                  <TableCell>{getStatusBadge(bug.status)}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.reporter}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.assignedTo}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.module}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.reportedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                        <MessageSquare className="w-4 h-4" />
                        {bug.comments > 0 && (
                          <Badge className="absolute -top-1 -right-1 text-xs px-1 py-0 min-w-0 h-4 bg-primary">
                            {bug.comments}
                          </Badge>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};