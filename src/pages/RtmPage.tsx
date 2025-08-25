import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit, Download, Upload } from "lucide-react";

interface RTMEntry {
  requirementId: string;
  mainFeature: string;
  subFeature: string;
  description: string;
  testCaseId: string;
  testStatus: string;
  remarks: string;
}

const RtmPage = () => {
  const [entries, setEntries] = useState<RTMEntry[]>([]);
  const [form, setForm] = useState<RTMEntry>({
    requirementId: "",
    mainFeature: "",
    subFeature: "",
    description: "",
    testCaseId: "",
    testStatus: "",
    remarks: ""
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddEntry = () => {
    if (editingIndex !== null) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[editingIndex] = form;
      setEntries(updatedEntries);
      setEditingIndex(null);
    } else {
      // Add new entry
      setEntries([...entries, form]);
    }
    
    // Reset form
    setForm({
      requirementId: "",
      mainFeature: "",
      subFeature: "",
      description: "",
      testCaseId: "",
      testStatus: "",
      remarks: ""
    });
  };

  const handleEditEntry = (index: number) => {
    setForm(entries[index]);
    setEditingIndex(index);
  };

  const handleDeleteEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({
        requirementId: "",
        mainFeature: "",
        subFeature: "",
        description: "",
        testCaseId: "",
        testStatus: "",
        remarks: ""
      });
    }
  };

  const handleExportToExcel = () => {
    if (entries.length === 0) {
      alert("No data to export");
      return;
    }

    // Prepare data for export
    const exportData = entries.map(entry => ({
      "Requirement ID": entry.requirementId,
      "Main Feature": entry.mainFeature,
      "Sub Feature": entry.subFeature,
      "Description": entry.description,
      "Test Case ID": entry.testCaseId,
      "Test Status": entry.testStatus,
      "Remarks": entry.remarks
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RTM");
    
    // Generate Excel file
    const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    
    // Download the file
    saveAs(blob, "requirements_traceability_matrix.xlsx");
  };

  const handleImportFromExcel = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Logic to import entries from Excel
    const file = event.target.files?.[0];
    if (file) {
      console.log("Import from Excel:", file);
      // In a real implementation, you would parse the Excel file
      // and set the entries state with the parsed data
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Requirements Traceability Matrix</h1>
          <p className="text-muted-foreground">Manage and track requirements with their corresponding test cases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportToExcel}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button variant="outline" asChild>
            <label>
              <Upload className="w-4 h-4 mr-2" />
              Import Excel
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleImportFromExcel}
                className="hidden"
              />
            </label>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{editingIndex !== null ? "Edit Entry" : "Add New Entry"}</CardTitle>
          <CardDescription>
            {editingIndex !== null 
              ? "Update the requirement traceability entry" 
              : "Add a new requirement traceability entry"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requirementId">Requirement ID *</Label>
              <Input
                id="requirementId"
                value={form.requirementId}
                onChange={(e) => setForm({ ...form, requirementId: e.target.value })}
                placeholder="REQ-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainFeature">Main Feature *</Label>
              <Input
                id="mainFeature"
                value={form.mainFeature}
                onChange={(e) => setForm({ ...form, mainFeature: e.target.value })}
                placeholder="Authentication"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subFeature">Sub Feature</Label>
              <Input
                id="subFeature"
                value={form.subFeature}
                onChange={(e) => setForm({ ...form, subFeature: e.target.value })}
                placeholder="Login Flow"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Requirement Description *</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="User should be able to login with valid credentials"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testCaseId">Test Case ID *</Label>
              <Input
                id="testCaseId"
                value={form.testCaseId}
                onChange={(e) => setForm({ ...form, testCaseId: e.target.value })}
                placeholder="TC-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testStatus">Test Status *</Label>
              <Select
                value={form.testStatus}
                onValueChange={(value) => setForm({ ...form, testStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <Label htmlFor="remarks">Remarks</Label>
              <Input
                id="remarks"
                value={form.remarks}
                onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                placeholder="Additional notes or comments"
              />
            </div>
          </div>

          <Button 
            onClick={handleAddEntry} 
            disabled={!form.requirementId || !form.mainFeature || !form.description || !form.testCaseId || !form.testStatus}
          >
            {editingIndex !== null ? "Update Entry" : "Add Entry"}
          </Button>

          {editingIndex !== null && (
            <Button variant="outline" onClick={() => {
              setEditingIndex(null);
              setForm({
                requirementId: "",
                mainFeature: "",
                subFeature: "",
                description: "",
                testCaseId: "",
                testStatus: "",
                remarks: ""
              });
            }} className="ml-2">
              Cancel Edit
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>RTM Entries</CardTitle>
          <CardDescription>
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Req ID</TableHead>
                <TableHead>Main Feature</TableHead>
                <TableHead>Sub Feature</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Test Case ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    No entries found. Add your first requirement traceability entry above.
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{entry.requirementId}</TableCell>
                    <TableCell>{entry.mainFeature}</TableCell>
                    <TableCell>{entry.subFeature}</TableCell>
                    <TableCell className="max-w-xs truncate">{entry.description}</TableCell>
                    <TableCell>{entry.testCaseId}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.testStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                        entry.testStatus === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        entry.testStatus === 'Blocked' ? 'bg-yellow-100 text-yellow-800' :
                        entry.testStatus === 'Failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {entry.testStatus}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{entry.remarks}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditEntry(index)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteEntry(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RtmPage;
