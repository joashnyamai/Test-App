import React, { useState, useMemo } from "react";
import { useTestPlanStore } from "@/store/test-plan-store";
import { TestPlanData } from "@/pages/TestPlans";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  FileText, 
  Calendar, 
  User,
  ChevronUp,
  ChevronDown,
  Filter
} from "lucide-react";
import { generateTestPlanPDF } from "@/utils/test-pdf-generator";
import { format } from "date-fns";

interface TestPlanListProps {
  onEdit: (planId: string) => void;
  onCreate: () => void;
}

export const TestPlanList: React.FC<TestPlanListProps> = ({ onEdit, onCreate }) => {
  const { testPlans, deleteTestPlan } = useTestPlanStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof TestPlanData>("projectName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set());

  const filteredAndSortedPlans = useMemo(() => {
    const filtered = testPlans.filter(plan =>
      plan.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.preparedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.version.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [testPlans, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof TestPlanData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectPlan = (projectName: string) => {
    const newSelected = new Set(selectedPlans);
    if (newSelected.has(projectName)) {
      newSelected.delete(projectName);
    } else {
      newSelected.add(projectName);
    }
    setSelectedPlans(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedPlans.size === filteredAndSortedPlans.length) {
      setSelectedPlans(new Set());
    } else {
      setSelectedPlans(new Set(filteredAndSortedPlans.map(p => p.projectName)));
    }
  };

  const handleDeleteSelected = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedPlans.size} test plan(s)?`)) {
      selectedPlans.forEach(projectName => {
        deleteTestPlan(projectName);
      });
      setSelectedPlans(new Set());
    }
  };

  const handleExportSelected = () => {
    selectedPlans.forEach(projectName => {
      const plan = testPlans.find(p => p.projectName === projectName);
      if (plan) {
        generateTestPlanPDF(plan);
      }
    });
  };

  const getSortIcon = (field: keyof TestPlanData) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testPlans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testPlans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testPlans.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search test plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          {selectedPlans.size > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportSelected}>
                <Download className="w-4 h-4 mr-2" />
                Export ({selectedPlans.size})
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteSelected}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedPlans.size})
              </Button>
            </div>
          )}
        </div>
        
        <Button onClick={onCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          New Test Plan
        </Button>
      </div>

      {/* Test Plans Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedPlans.size === filteredAndSortedPlans.length && filteredAndSortedPlans.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4"
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('projectName')}
                >
                  <div className="flex items-center gap-2">
                    Project Name
                    {getSortIcon('projectName')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('version')}
                >
                  <div className="flex items-center gap-2">
                    Version
                    {getSortIcon('version')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('preparedBy')}
                >
                  <div className="flex items-center gap-2">
                    Prepared By
                    {getSortIcon('preparedBy')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('dateCreated')}
                >
                  <div className="flex items-center gap-2">
                    Created
                    {getSortIcon('dateCreated')}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPlans.map((plan) => (
                <TableRow key={plan.projectName} className="hover:bg-muted/50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedPlans.has(plan.projectName)}
                      onChange={() => handleSelectPlan(plan.projectName)}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{plan.projectName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{plan.version}</Badge>
                  </TableCell>
                  <TableCell>{plan.preparedBy}</TableCell>
                  <TableCell>{plan.dateCreated}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Draft</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generateTestPlanPDF(plan)}
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(plan.projectName)}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this test plan?')) {
                            deleteTestPlan(plan.projectName);
                          }
                        }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAndSortedPlans.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm ? 'No test plans found matching your search.' : 'No test plans created yet.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
