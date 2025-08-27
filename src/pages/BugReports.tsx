import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
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
import { useBugReportStore } from "@/store/bug-report-store";
import { BugReportForm } from "@/components/bug-report/BugReportForm";
import { BugReportDetails } from "@/components/bug-report/BugReportDetails";
import { BugReportExcelButtons } from "@/components/bug-report/BugReportExcelButtons";
import { BugReport } from "@/types/bug-report";

export const BugReports = () => {
  const { bugReports, deleteBugReport } = useBugReportStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editingBug, setEditingBug] = useState<BugReport | undefined>();
  const [viewingBug, setViewingBug] = useState<BugReport | undefined>();

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (dateResolved?: string) => {
    if (dateResolved) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Open</Badge>;
  };

  const filteredBugs = bugReports.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bug.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === "all" || bug.severity.toLowerCase() === severityFilter;
    const matchesPriority = priorityFilter === "all" || bug.priority.toLowerCase() === priorityFilter;
    
    return matchesSearch && matchesSeverity && matchesPriority;
  });

  const handleCreateBug = () => {
    setEditingBug(undefined);
    setFormOpen(true);
  };

  const handleEditBug = (bug: BugReport) => {
    setEditingBug(bug);
    setFormOpen(true);
  };

  const handleViewBug = (bug: BugReport) => {
    setViewingBug(bug);
    setDetailsOpen(true);
  };

  const handleDeleteBug = (id: string) => {
    if (confirm("Are you sure you want to delete this bug report?")) {
      deleteBugReport(id);
    }
  };

  const handleFormSubmit = (data: {
    title: string;
    module: string;
    shortDescription: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    reportedBy: string;
    dateReported: string;
    stepsToReproduce: string;
    expectedResults: string;
    actualResults: string;
    assignedTo: string;
    environment: string;
    comments: string;
    remarks: string;
    dateResolved?: string;
  }) => {
    if (editingBug) {
      useBugReportStore.getState().updateBugReport(editingBug.id, data);
    } else {
      const newBug: BugReport = {
        ...data,
        id: `BUG-${Date.now()}`,
      };
      useBugReportStore.getState().addBugReport(newBug);
    }
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bug Reports</h1>
          <p className="text-muted-foreground mt-1">Track and manage reported issues</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary" onClick={handleCreateBug}>
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
                  placeholder="Search bugs by title, ID, module, reporter, or assignee..."
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

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
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
            <BugReportExcelButtons />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="w-24">Bug ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-24">Severity</TableHead>
                <TableHead className="w-24">Priority</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-32">Reporter</TableHead>
                <TableHead className="w-32">Assigned To</TableHead>
                <TableHead className="w-32">Module</TableHead>
                <TableHead className="w-28">Reported</TableHead>
                <TableHead className="w-28">Resolved</TableHead>
                <TableHead className="w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBugs.map((bug) => (
                <TableRow key={bug.id} className="table-row">
                  <TableCell className="font-medium text-primary">{bug.id}</TableCell>
                  <TableCell className="font-medium">{bug.title}</TableCell>
                  <TableCell>{getSeverityBadge(bug.severity)}</TableCell>
                  <TableCell>{getPriorityBadge(bug.priority)}</TableCell>
                  <TableCell>{getStatusBadge(bug.dateResolved)}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.reportedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.assignedTo}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.module}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.dateReported}</TableCell>
                  <TableCell className="text-muted-foreground">{bug.dateResolved || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewBug(bug)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditBug(bug)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleDeleteBug(bug.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <BugReportForm
        open={formOpen}
        onOpenChange={setFormOpen}
        bug={editingBug}
        onSubmit={handleFormSubmit}
      />

      {/* Details Dialog */}
      <BugReportDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        bug={viewingBug!}
      />
    </div>
  );
};
