import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useQaReportStore } from "@/store/qa-report-store";
import type { QaReport, BugDetail } from "@/types/qa-report";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";

interface QaReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId?: string;
  onSuccess: () => void;
}

const QaReportForm = ({ open, onOpenChange, reportId, onSuccess }: QaReportFormProps) => {
  const { qaReports, addQaReport, updateQaReport } = useQaReportStore();
  const [formData, setFormData] = useState<QaReport>({
    id: reportId || "",
    reportTitle: "",
    group: "",
    projectName: "",
    ragStatus: "Green",
    projectSection: "",
    cohort: "",
    startDate: "",
    endDate: "",
    defectsDistribution: { critical: 0, major: 0, medium: 0, low: 0, total: 0 },
    testDistribution: { automated: 0, manual: 0, nonFunctional: 0 },
    testCaseExecution: {
      totalTestCases: 0,
      testCasesExecuted: 0,
      blockedTestCases: 0,
      passedTestCases: 0,
      failedTestCases: 0,
      skippedTestCases: 0,
      executionRate: 0,
      passRate: 0,
      failRate: 0,
    },
    defectStatus: {
      openCritical: 0,
      openMajor: 0,
      openMedium: 0,
      openLow: 0,
      verifiedCritical: 0,
      verifiedMajor: 0,
      verifiedMedium: 0,
      verifiedLow: 0,
      assignedCritical: 0,
      assignedMajor: 0,
      assignedMedium: 0,
      assignedLow: 0,
      rejectedCritical: 0,
      rejectedMajor: 0,
      rejectedMedium: 0,
      rejectedLow: 0,
      totalDefects: 0,
    },
    bugDetails: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [newBug, setNewBug] = useState<BugDetail>({
    bugId: "",
    title: "",
    severity: "Low",
    priority: "Low",
    status: "Open",
    stepsToProduce: "",
    actualResult: "",
  });

  useEffect(() => {
    if (reportId) {
      const existingReport = qaReports.find(report => report.id === reportId);
      if (existingReport) {
        setFormData(existingReport);
      }
    } else {
      // Reset form for new report
      setFormData({
        id: "",
        reportTitle: "",
        group: "",
        projectName: "",
        ragStatus: "Green",
        projectSection: "",
        cohort: "",
        startDate: "",
        endDate: "",
        defectsDistribution: { critical: 0, major: 0, medium: 0, low: 0, total: 0 },
        testDistribution: { automated: 0, manual: 0, nonFunctional: 0 },
        testCaseExecution: {
          totalTestCases: 0,
          testCasesExecuted: 0,
          blockedTestCases: 0,
          passedTestCases: 0,
          failedTestCases: 0,
          skippedTestCases: 0,
          executionRate: 0,
          passRate: 0,
          failRate: 0,
        },
        defectStatus: {
          openCritical: 0,
          openMajor: 0,
          openMedium: 0,
          openLow: 0,
          verifiedCritical: 0,
          verifiedMajor: 0,
          verifiedMedium: 0,
          verifiedLow: 0,
          assignedCritical: 0,
          assignedMajor: 0,
          assignedMedium: 0,
          assignedLow: 0,
          rejectedCritical: 0,
          rejectedMajor: 0,
          rejectedMedium: 0,
          rejectedLow: 0,
          totalDefects: 0,
        },
        bugDetails: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [reportId, qaReports, open]);

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.reportTitle || !formData.group || !formData.projectName) {
      alert("Please fill in all required fields.");
      return;
    }

    const finalData = {
      ...formData,
      updatedAt: new Date().toISOString(),
      id: reportId || Date.now().toString(),
    };

    if (reportId) {
      updateQaReport(reportId, finalData);
    } else {
      addQaReport(finalData);
    }

    onSuccess();
    onOpenChange(false);
  };

  const addBug = () => {
    console.log('Adding bug:', JSON.stringify(newBug));
    if (newBug.bugId && newBug.title) {
      const updatedBugDetails = [...formData.bugDetails, newBug];
      console.log('Updated bug details:', updatedBugDetails);
      
      setFormData({
        ...formData,
        bugDetails: updatedBugDetails,
      });
      
      setNewBug({
        bugId: "",
        title: "",
        severity: "Low",
        priority: "Low",
        status: "Open",
        stepsToProduce: "",
        actualResult: "",
      });
    } else {
      console.log('Bug ID or Title missing');
    }
  };

  const removeBug = (index: number) => {
    setFormData({
      ...formData,
      bugDetails: formData.bugDetails.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{reportId ? "Edit QA Report" : "Create New QA Report"}</DialogTitle>
          <DialogDescription>
            Fill in all the details for your quality assurance report
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            
            <div>
              <Label>Report Title *</Label>
              <Input
                value={formData.reportTitle}
                onChange={(e) => setFormData({ ...formData, reportTitle: e.target.value })}
                placeholder="QA Report Title"
              />
            </div>

            <div>
              <Label>Group *</Label>
              <Input
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                placeholder="Team/Group Name"
              />
            </div>

            <div>
              <Label>Project Name *</Label>
              <Input
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                placeholder="Project Name"
              />
            </div>

            <div>
              <Label>RAG Status</Label>
              <Select value={formData.ragStatus} onValueChange={(value) => setFormData({ ...formData, ragStatus: value as "Red" | "Amber" | "Green" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select RAG Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Green">Green</SelectItem>
                  <SelectItem value="Amber">Amber</SelectItem>
                  <SelectItem value="Red">Red</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Project Section</Label>
              <Input
                value={formData.projectSection}
                onChange={(e) => setFormData({ ...formData, projectSection: e.target.value })}
                placeholder="Project Section/Module"
              />
            </div>

            <div>
              <Label>Cohort</Label>
              <Input
                value={formData.cohort}
                onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
                placeholder="Cohort/Version"
              />
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          {/* Defects Distribution */}
          <div className="space-y-4">
            <h3 className="font-semibold">Defects Distribution</h3>
            
            {Object.entries(formData.defectsDistribution).map(([key, value]) => (
              key !== 'total' && (
                <div key={key}>
                  <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => setFormData({
                      ...formData,
                      defectsDistribution: {
                        ...formData.defectsDistribution,
                        [key]: parseInt(e.target.value) || 0,
                        total: Object.entries(formData.defectsDistribution)
                          .filter(([k]) => k !== 'total')
                          .reduce((sum, [k, v]) => sum + (k === key ? parseInt(e.target.value) || 0 : v), 0)
                      }
                    })}
                  />
                </div>
              )
            ))}
          </div>

          {/* Test Distribution */}
          <div className="space-y-4">
            <h3 className="font-semibold">Test Distribution</h3>
            
            {Object.entries(formData.testDistribution).map(([key, value]) => (
              <div key={key}>
                <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    testDistribution: {
                      ...formData.testDistribution,
                      [key]: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>
            ))}
          </div>

          {/* Test Case Execution */}
          <div className="space-y-4">
            <h3 className="font-semibold">Test Case Execution</h3>
            
            {Object.entries(formData.testCaseExecution).map(([key, value]) => (
              <div key={key}>
                <Label>{key.split(/(?=[A-Z])/).join(' ')}</Label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    testCaseExecution: {
                      ...formData.testCaseExecution,
                      [key]: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>
            ))}
          </div>

          {/* Defect Status */}
          <div className="space-y-4">
            <h3 className="font-semibold">Defect Status</h3>
            
            {Object.entries(formData.defectStatus).map(([key, value]) => (
              <div key={key}>
                <Label>{key.split(/(?=[A-Z])/).join(' ')}</Label>
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => setFormData({
                    ...formData,
                    defectStatus: {
                      ...formData.defectStatus,
                      [key]: parseInt(e.target.value) || 0
                    }
                  })}
                />
              </div>
            ))}
          </div>

          {/* Bug Details */}
          <div className="space-y-4 col-span-2">
            <h3 className="font-semibold">Bug Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
              <div>
                <Label>Bug ID</Label>
                <Input
                  value={newBug.bugId}
                  onChange={(e) => setNewBug({ ...newBug, bugId: e.target.value })}
                  placeholder="BUG-001"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={newBug.title}
                  onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
                  placeholder="Bug title"
                />
              </div>
              <div>
                <Label>Severity</Label>
                <Select value={newBug.severity} onValueChange={(value) => setNewBug({ ...newBug, severity: value as 'Critical' | 'High' | 'Medium' | 'Low' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={newBug.priority} onValueChange={(value) => setNewBug({ ...newBug, priority: value as 'Critical' | 'High' | 'Medium' | 'Low' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={newBug.status} onValueChange={(value) => setNewBug({ ...newBug, status: value as 'Open' | 'Verified & Closed' | 'Assigned' | 'Rejected' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Verified & Closed">Verified & Closed</SelectItem>
                    <SelectItem value="Assigned">Assigned</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Steps to Produce</Label>
                <Textarea
                  value={newBug.stepsToProduce}
                  onChange={(e) => setNewBug({ ...newBug, stepsToProduce: e.target.value })}
                  placeholder="Detailed steps to reproduce the bug"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <Label>Actual Result</Label>
                <Textarea
                  value={newBug.actualResult}
                  onChange={(e) => setNewBug({ ...newBug, actualResult: e.target.value })}
                  placeholder="What actually happens"
                  rows={2}
                />
              </div>
              <div className="col-span-2">
                <Button onClick={addBug} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bug
                </Button>
              </div>
            </div>

            {/* List of added bugs */}
            {formData.bugDetails.map((bug, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <strong>{bug.bugId}</strong>: {bug.title}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBug(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Severity: {bug.severity} | Priority: {bug.priority} | Status: {bug.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {reportId ? "Update Report" : "Create Report"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QaReportForm;
