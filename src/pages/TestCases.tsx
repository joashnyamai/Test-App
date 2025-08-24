import { useMemo, useState } from "react";
import { Plus, Filter, Search, Edit, Trash2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { useTestCaseStore, TestCase, TestStatus } from "@/store/testcase-store";
import { ExcelButtons } from "@/components/ExcelButtons";

export const TestCases = () => {
  const { testCases, addTestCase, removeTestCase } = useTestCaseStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Lowercase<TestStatus>>("all");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<TestCase>({
    id: "",
    title: "",
    preconditions: "",
    testSteps: "",
    testData: "",
    expectedResults: "",
    actualResults: "",
    status: "Not Run",
    executedBy: "",
    executionDate: "",
    remarks: "",
    testedBy: "",
  });

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return testCases.filter((t) => {
      const matchSearch =
        t.id.toLowerCase().includes(s) ||
        t.title.toLowerCase().includes(s) ||
        t.preconditions.toLowerCase().includes(s);
      const matchStatus =
        statusFilter === "all" || t.status.toLowerCase() === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [testCases, search, statusFilter]);

  const saveForm = () => {
    if (!form.id || !form.title) {
      alert("Testcase Id and Title are required.");
      return;
    }

    if (editingId) {
      // Update
      removeTestCase(editingId);
    }

    const toSave: TestCase = {
      ...form,
      executionDate: form.executionDate
        ? typeof form.executionDate === "string"
          ? form.executionDate
          : format(form.executionDate as unknown as Date, "yyyy-MM-dd")
        : "",
    };

    addTestCase(toSave);

    // reset
    setForm({
      id: "",
      title: "",
      preconditions: "",
      testSteps: "",
      testData: "",
      expectedResults: "",
      actualResults: "",
      status: "Not Run",
      executedBy: "",
      executionDate: "",
      remarks: "",
      testedBy: "",
    });
    setEditingId(null);
    setOpen(false);
  };

  const startEdit = (tc: TestCase) => {
    setForm({
      ...tc,
      executionDate: tc.executionDate ? tc.executionDate : "",
    });
    setEditingId(tc.id);
    setOpen(true);
  };

  const statusBadge = (status: TestStatus) => {
    const map: Record<TestStatus, string> = {
      Passed: "bg-green-100 text-green-700",
      Failed: "bg-red-100 text-red-700",
      Blocked: "bg-yellow-100 text-yellow-800",
      "Not Run": "bg-gray-100 text-gray-700",
    };
    return <Badge className={map[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Cases</h1>
          <p className="text-muted-foreground">Manage and execute your test cases</p>
        </div>

        <div className="flex items-center gap-2">
          <ExcelButtons />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Test Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl rounded-xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Test Case" : "Create New Test Case"}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-4">
                {/* Left */}
                <div>
                  <Label>Testcase Id</Label>
                  <Input
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    disabled={!!editingId} // prevent changing ID when editing
                  />

                  <Label className="mt-3">Title</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />

                  <Label className="mt-3">Preconditions</Label>
                  <Textarea
                    value={form.preconditions}
                    onChange={(e) => setForm({ ...form, preconditions: e.target.value })}
                  />

                  <Label className="mt-3">Test Steps</Label>
                  <Textarea
                    value={form.testSteps}
                    onChange={(e) => setForm({ ...form, testSteps: e.target.value })}
                  />

                  <Label className="mt-3">Test Data</Label>
                  <Textarea
                    value={form.testData}
                    onChange={(e) => setForm({ ...form, testData: e.target.value })}
                  />
                </div>

                {/* Right */}
                <div>
                  <Label>Expected Results</Label>
                  <Textarea
                    value={form.expectedResults}
                    onChange={(e) => setForm({ ...form, expectedResults: e.target.value })}
                  />

                  <Label className="mt-3">Actual Results</Label>
                  <Textarea
                    value={form.actualResults}
                    onChange={(e) => setForm({ ...form, actualResults: e.target.value })}
                  />

                  <Label className="mt-3">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm({ ...form, status: v as TestStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Run">Not Run</SelectItem>
                      <SelectItem value="Passed">Passed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>

                  <Label className="mt-3">Executed By</Label>
                  <Input
                    value={form.executedBy}
                    onChange={(e) => setForm({ ...form, executedBy: e.target.value })}
                  />

                  <Label className="mt-3">Execution Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        {form.executionDate
                          ? typeof form.executionDate === "string"
                            ? form.executionDate
                            : format(form.executionDate as unknown as Date, "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={
                          form.executionDate && typeof form.executionDate !== "string"
                            ? (form.executionDate as unknown as Date)
                            : undefined
                        }
                        onSelect={(d) =>
                          setForm({ ...form, executionDate: d ? format(d, "yyyy-MM-dd") : "" })
                        }
                      />
                    </PopoverContent>
                  </Popover>

                  <Label className="mt-3">Remarks</Label>
                  <Textarea
                    value={form.remarks}
                    onChange={(e) => setForm({ ...form, remarks: e.target.value })}
                  />

                  <Label className="mt-3">Tested By</Label>
                  <Input
                    value={form.testedBy}
                    onChange={(e) => setForm({ ...form, testedBy: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={saveForm}>{editingId ? "Update" : "Save"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Id / Title / Preconditions..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={(v: "all" | Lowercase<TestStatus>) => setStatusFilter(v)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="not run">Not Run</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Test Cases ({filtered.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[1200px]">
            <TableHeader>
              <TableRow>
                <TableHead>Testcase Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Preconditions</TableHead>
                <TableHead>Test Steps</TableHead>
                <TableHead>Test Data</TableHead>
                <TableHead>Expected Results</TableHead>
                <TableHead>Actual Results</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Executed By</TableHead>
                <TableHead>Execution Date</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Tested By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-medium">{t.id}</TableCell>
                  <TableCell className="font-medium">{t.title}</TableCell>
                  <TableCell>{t.preconditions}</TableCell>
                  <TableCell>{t.testSteps}</TableCell>
                  <TableCell>{t.testData}</TableCell>
                  <TableCell>{t.expectedResults}</TableCell>
                  <TableCell>{t.actualResults}</TableCell>
                  <TableCell>{statusBadge(t.status)}</TableCell>
                  <TableCell>{t.executedBy}</TableCell>
                  <TableCell>{t.executionDate}</TableCell>
                  <TableCell>{t.remarks}</TableCell>
                  <TableCell>{t.testedBy}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title="Run">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Edit"
                        onClick={() => startEdit(t)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        className="text-destructive"
                        onClick={() => removeTestCase(t.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={13}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No test cases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
