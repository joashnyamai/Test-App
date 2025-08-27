import React, { useState, useMemo } from "react";
import { useTestSuiteStore } from "@/store/test-suite-store";
import { TestSuite } from "@/store/test-suite-store";
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
  FileText,
  Calendar,
  User,
  ChevronUp,
  ChevronDown,
  Filter
} from "lucide-react";

interface TestSuiteListProps {
  onEdit: (suiteId: string) => void;
  onCreate: () => void;
}

export const TestSuiteList: React.FC<TestSuiteListProps> = ({ onEdit, onCreate }) => {
  const { testSuites, deleteTestSuite } = useTestSuiteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof TestSuite>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedSuites, setSelectedSuites] = useState<Set<string>>(new Set());

  const filteredAndSortedSuites = useMemo(() => {
    const filtered = testSuites.filter(suite =>
      suite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suite.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suite.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortField === 'testCases') {
        // Handle test cases count sorting
        return sortDirection === 'asc' 
          ? a.testCases.length - b.testCases.length
          : b.testCases.length - a.testCases.length;
      }
      
      if (sortField === 'createdAt') {
        // Handle date sorting
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [testSuites, searchTerm, sortField, sortDirection]);

  const handleSort = (field: keyof TestSuite) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectSuite = (suiteId: string) => {
    const newSelected = new Set(selectedSuites);
    if (newSelected.has(suiteId)) {
      newSelected.delete(suiteId);
    } else {
      newSelected.add(suiteId);
    }
    setSelectedSuites(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedSuites.size === filteredAndSortedSuites.length && filteredAndSortedSuites.length > 0) {
      setSelectedSuites(new Set());
    } else {
      setSelectedSuites(new Set(filteredAndSortedSuites.map(s => s.id)));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedSuites.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedSuites.size} test suite(s)? This action cannot be undone.`)) {
      selectedSuites.forEach(suiteId => {
        deleteTestSuite(suiteId);
      });
      setSelectedSuites(new Set());
    }
  };

  const handleDeleteSingle = (suiteId: string, suiteName: string) => {
    if (window.confirm(`Are you sure you want to delete the test suite "${suiteName}"? This action cannot be undone.`)) {
      deleteTestSuite(suiteId);
      // Remove from selected if it was selected
      const newSelected = new Set(selectedSuites);
      newSelected.delete(suiteId);
      setSelectedSuites(newSelected);
    }
  };

  const getSortIcon = (field: keyof TestSuite) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      'Active': 'bg-green-100 text-green-700',
      'Inactive': 'bg-gray-100 text-gray-700',
      'Draft': 'bg-yellow-100 text-yellow-700',
      'Completed': 'bg-blue-100 text-blue-700'
    };
    return <Badge className={statusMap[status] || 'bg-gray-100 text-gray-700'}>{status}</Badge>;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suites</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testSuites.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testSuites.filter(s => s.status === 'Active').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Cases</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testSuites.reduce((total, suite) => total + suite.testCases.length, 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testSuites.filter(s => s.status === 'Draft').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search test suites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          {selectedSuites.size > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleDeleteSelected}
                disabled={selectedSuites.size === 0}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete ({selectedSuites.size})
              </Button>
            </div>
          )}
        </div>
        
        <Button onClick={onCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          New Test Suite
        </Button>
      </div>

      {/* Test Suites Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={selectedSuites.size === filteredAndSortedSuites.length && filteredAndSortedSuites.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4"
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Name
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('testCases')}
                >
                  <div className="flex items-center gap-2">
                    Test Cases
                    {getSortIcon('testCases')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon('status')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('owner')}
                >
                  <div className="flex items-center gap-2">
                    Owner
                    {getSortIcon('owner')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    Created
                    {getSortIcon('createdAt')}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedSuites.map((suite) => (
                <TableRow key={suite.id} className="hover:bg-muted/50">
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedSuites.has(suite.id)}
                      onChange={() => handleSelectSuite(suite.id)}
                      className="w-4 h-4"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{suite.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{suite.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{suite.testCases.length} cases</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(suite.status)}</TableCell>
                  <TableCell>{suite.owner}</TableCell>
                  <TableCell>{formatDate(suite.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(suite.id)}
                        title="Edit test suite"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSingle(suite.id, suite.name)}
                        title="Delete test suite"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAndSortedSuites.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              {searchTerm ? 'No test suites found matching your search.' : 'No test suites created yet.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};