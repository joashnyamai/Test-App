import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Clock, Users, Bug } from "lucide-react";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBugBashStore } from "@/store/bug-bash-store";
import { BugBashForm } from "@/components/bug-bash/BugBashForm";
import { BugBashDetails } from "@/components/bug-bash/BugBashDetails";
import type { BugBash as BugBashType } from "@/types/bug-bash";

export const BugBash = () => {
  const { bugBashes, deleteBugBash } = useBugBashStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editingBugBash, setEditingBugBash] = useState<BugBashType | undefined>();
  const [viewingBugBash, setViewingBugBash] = useState<BugBashType | undefined>();

  const getStatusBadge = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    if (end > now) {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Completed</Badge>;
  };

  const filteredBugBashes = bugBashes.filter(bash => {
    return bash.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           bash.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
           bash.participants.some(participant => 
             participant.toLowerCase().includes(searchTerm.toLowerCase())
           );
  });

  const handleCreateBugBash = () => {
    console.log("Creating a new Bug Bash session..."); // Log to confirm function call
    setEditingBugBash(undefined);
    setFormOpen(true);
  };

  const handleEditBugBash = (bugBash: BugBashType) => {
    setEditingBugBash(bugBash);
    setFormOpen(true);
  };

  const handleViewBugBash = (bugBash: BugBashType) => {
    setViewingBugBash(bugBash);
    setDetailsOpen(true);
  };

  const handleDeleteBugBash = (id: string) => {
    if (confirm("Are you sure you want to delete this bug bash session?")) {
      deleteBugBash(id);
    }
  };

  const handleFormSubmit = (data: {
    title: string;
    participants: string[];
    startTime: string;
    endTime: string;
    results: string;
    remarks: string;
  }) => {
    if (editingBugBash) {
      useBugBashStore.getState().updateBugBash(editingBugBash.id, data);
    } else {
      const newBugBash: BugBashType = {
        ...data,
        id: `BASH-${Date.now()}`,
        bugsReported: []
      };
      useBugBashStore.getState().addBugBash(newBugBash);
    }
    setFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bug Bash Sessions</h1>
          <p className="text-muted-foreground mt-1">Organize and track bug bash events</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-primary" onClick={handleCreateBugBash}>
          <Plus className="w-4 h-4 mr-2" />
          New Bug Bash
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
                  placeholder="Search bug bashes by title, ID, or participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bug Bash Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Bug Bash Sessions ({filteredBugBashes.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="data-table">
            <TableHeader>
              <TableRow className="table-header">
                <TableHead className="w-24">Session ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-32">Participants</TableHead>
                <TableHead className="w-32">Start Time</TableHead>
                <TableHead className="w-32">End Time</TableHead>
                <TableHead className="w-24">Bugs Found</TableHead>
                <TableHead className="w-24">Status</TableHead>
                <TableHead className="w-40">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBugBashes.map((bash) => (
                <TableRow key={bash.id} className="table-row">
                  <TableCell className="font-medium text-primary">{bash.id}</TableCell>
                  <TableCell className="font-medium">{bash.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {bash.participants.length}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{bash.startTime}</TableCell>
                  <TableCell className="text-muted-foreground">{bash.endTime}</TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center">
                      <Bug className="w-4 h-4 mr-1" />
                      {bash.bugsReported.length}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(bash.endTime)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewBugBash(bash)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditBugBash(bash)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleDeleteBugBash(bash.id)}
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
      <BugBashForm
        open={formOpen}
        onOpenChange={setFormOpen}
        bugBash={editingBugBash}
        onSubmit={handleFormSubmit}
      />

      {/* Details Dialog */}
      <BugBashDetails
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        bugBash={viewingBugBash!}
      />
    </div>
  );
};
