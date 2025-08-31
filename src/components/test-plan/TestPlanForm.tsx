import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTestPlanStore } from "@/store/test-plan-store";
import type { TestPlanData } from "@/pages/TestPlans";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Trash2, Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TestPlanFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId?: string;
  onSuccess: () => void;
}

const TestPlanForm = ({ open, onOpenChange, planId, onSuccess }: TestPlanFormProps) => {
  const { testPlans, addTestPlan, updateTestPlan } = useTestPlanStore();
  const [formData, setFormData] = useState<TestPlanData>({
    projectName: "",
    version: "1.0",
    preparedBy: "",
    dateCreated: new Date().toLocaleDateString(),
    reviewedBy: "",
    approvalDate: "[Pending Approval]",
    introduction: "",
    objectives: "",
    inScope: "",
    outOfScope: "",
    testItems: "",
    testStrategy: "",
    testEnvironment: "",
    entryCriteria: "",
    exitCriteria: "",
    testDeliverables: "",
    roles: [],
    schedule: [],
    risks: [],
    members: []
  });

  const [newRole, setNewRole] = useState({ name: "", role: "", responsibilities: "" });
  const [newSchedule, setNewSchedule] = useState({ task: "", startDate: "", endDate: "", owner: "" });
  const [newRisk, setNewRisk] = useState({ risk: "", impact: "", mitigation: "" });
  const [newMember, setNewMember] = useState("");

  // State for date pickers
  const [dateCreated, setDateCreated] = useState<Date | null>(new Date());
  const [approvalDate, setApprovalDate] = useState<Date | null>(null);
  const [scheduleStartDate, setScheduleStartDate] = useState<Date | null>(null);
  const [scheduleEndDate, setScheduleEndDate] = useState<Date | null>(null);

  useEffect(() => {
    if (planId) {
      const existingPlan = testPlans.find(plan => plan.projectName === planId);
      if (existingPlan) {
        setFormData(existingPlan);
        // Set dates from existing plan
        if (existingPlan.dateCreated) {
          setDateCreated(new Date(existingPlan.dateCreated));
        }
        if (existingPlan.approvalDate && existingPlan.approvalDate !== "[Pending Approval]") {
          setApprovalDate(new Date(existingPlan.approvalDate));
        }
      }
    } else {
      // Reset form for new plan
      setFormData({
        projectName: "",
        version: "1.0",
        preparedBy: "",
        dateCreated: new Date().toLocaleDateString(),
        reviewedBy: "",
        approvalDate: "[Pending Approval]",
        introduction: "",
        objectives: "",
        inScope: "",
        outOfScope: "",
        testItems: "",
        testStrategy: "",
        testEnvironment: "",
        entryCriteria: "",
        exitCriteria: "",
        testDeliverables: "",
        roles: [],
        schedule: [],
        risks: [],
        members: []
      });
      setDateCreated(new Date());
      setApprovalDate(null);
    }
  }, [planId, testPlans, open]);

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.projectName || !formData.preparedBy) {
      alert("Please fill in all required fields.");
      return;
    }

    // Format dates before submission
    const formattedData = {
      ...formData,
      dateCreated: dateCreated ? dateCreated.toLocaleDateString() : new Date().toLocaleDateString(),
      approvalDate: approvalDate ? approvalDate.toLocaleDateString() : "[Pending Approval]"
    };

    if (planId) {
      updateTestPlan(planId, formattedData);
    } else {
      addTestPlan(formattedData);
    }

    onSuccess();
    onOpenChange(false);
  };

  const addRole = () => {
    if (newRole.name && newRole.role) {
      setFormData({
        ...formData,
        roles: [...formData.roles, newRole]
      });
      setNewRole({ name: "", role: "", responsibilities: "" });
    }
  };

  const removeRole = (index: number) => {
    setFormData({
      ...formData,
      roles: formData.roles.filter((_, i) => i !== index)
    });
  };

  const addSchedule = () => {
    if (newSchedule.task && scheduleStartDate) {
      const scheduleItem = {
        ...newSchedule,
        startDate: scheduleStartDate ? scheduleStartDate.toLocaleDateString() : "",
        endDate: scheduleEndDate ? scheduleEndDate.toLocaleDateString() : ""
      };
      
      setFormData({
        ...formData,
        schedule: [...formData.schedule, scheduleItem]
      });
      setNewSchedule({ task: "", startDate: "", endDate: "", owner: "" });
      setScheduleStartDate(null);
      setScheduleEndDate(null);
    }
  };

  const removeSchedule = (index: number) => {
    setFormData({
      ...formData,
      schedule: formData.schedule.filter((_, i) => i !== index)
    });
  };

  const addRisk = () => {
    if (newRisk.risk && newRisk.impact) {
      setFormData({
        ...formData,
        risks: [...formData.risks, newRisk]
      });
      setNewRisk({ risk: "", impact: "", mitigation: "" });
    }
  };

  const removeRisk = (index: number) => {
    setFormData({
      ...formData,
      risks: formData.risks.filter((_, i) => i !== index)
    });
  };

  const addMember = () => {
    if (newMember.trim()) {
      setFormData({
        ...formData,
        members: [...formData.members, newMember.trim()]
      });
      setNewMember("");
    }
  };

  const removeMember = (index: number) => {
    setFormData({
      ...formData,
      members: formData.members.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{planId ? "Edit Test Plan" : "Create New Test Plan"}</DialogTitle>
          <DialogDescription>
            Fill in all the details for your test plan
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="scope">Scope & Strategy</TabsTrigger>
            <TabsTrigger value="criteria">Criteria & Deliverables</TabsTrigger>
            <TabsTrigger value="roles">Roles & Schedule</TabsTrigger>
            <TabsTrigger value="team">Team & Risks</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            {/* Document Control */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="Version"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparedBy">Prepared By *</Label>
                <Input
                  id="preparedBy"
                  value={formData.preparedBy}
                  onChange={(e) => setFormData({ ...formData, preparedBy: e.target.value })}
                  placeholder="Name of preparer"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateCreated">Date Created</Label>
                <DatePicker
                  selected={dateCreated}
                  onChange={(date: Date) => setDateCreated(date)}
                  className="w-full p-2 border rounded-md"
                  dateFormat="MM/dd/yyyy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewedBy">Reviewed By</Label>
                <Input
                  id="reviewedBy"
                  value={formData.reviewedBy}
                  onChange={(e) => setFormData({ ...formData, reviewedBy: e.target.value })}
                  placeholder="Name of reviewer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approvalDate">Approval Date</Label>
                <DatePicker
                  selected={approvalDate}
                  onChange={(date: Date) => setApprovalDate(date)}
                  className="w-full p-2 border rounded-md"
                  dateFormat="MM/dd/yyyy"
                  placeholderText="Select approval date"
                  isClearable
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scope" className="space-y-6">
            {/* Introduction */}
            <div className="space-y-2">
              <Label>Introduction</Label>
              <Textarea
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                rows={4}
                placeholder="Project introduction..."
              />
            </div>

            {/* Objectives */}
            <div className="space-y-2">
              <Label>Objectives</Label>
              <Textarea
                value={formData.objectives}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                rows={3}
                placeholder="Test objectives..."
              />
            </div>

            {/* Scope */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>In Scope</Label>
                <Textarea
                  value={formData.inScope}
                  onChange={(e) => setFormData({ ...formData, inScope: e.target.value })}
                  rows={3}
                  placeholder="What is in scope..."
                />
              </div>
              <div className="space-y-2">
                <Label>Out of Scope</Label>
                <Textarea
                  value={formData.outOfScope}
                  onChange={(e) => setFormData({ ...formData, outOfScope: e.target.value })}
                  rows={3}
                  placeholder="What is out of scope..."
                />
              </div>
            </div>

            {/* Test Items */}
            <div className="space-y-2">
              <Label>Test Items / Features to be Tested</Label>
              <Textarea
                value={formData.testItems}
                onChange={(e) => setFormData({ ...formData, testItems: e.target.value })}
                rows={4}
                placeholder="List of test items..."
              />
            </div>

            {/* Test Strategy */}
            <div className="space-y-2">
              <Label>Test Strategy</Label>
              <Textarea
                value={formData.testStrategy}
                onChange={(e) => setFormData({ ...formData, testStrategy: e.target.value })}
                rows={4}
                placeholder="Test strategy..."
              />
            </div>

            {/* Test Environment */}
            <div className="space-y-2">
              <Label>Test Environment</Label>
              <Textarea
                value={formData.testEnvironment}
                onChange={(e) => setFormData({ ...formData, testEnvironment: e.target.value })}
                rows={3}
                placeholder="Test environment details..."
              />
            </div>
          </TabsContent>

          <TabsContent value="criteria" className="space-y-6">
            {/* Entry & Exit Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Entry Criteria</Label>
                <Textarea
                  value={formData.entryCriteria}
                  onChange={(e) => setFormData({ ...formData, entryCriteria: e.target.value })}
                  rows={3}
                  placeholder="Entry criteria..."
                />
              </div>
              <div className="space-y-2">
                <Label>Exit Criteria</Label>
                <Textarea
                  value={formData.exitCriteria}
                  onChange={(e) => setFormData({ ...formData, exitCriteria: e.target.value })}
                  rows={3}
                  placeholder="Exit criteria..."
                />
              </div>
            </div>

            {/* Test Deliverables */}
            <div className="space-y-2">
              <Label>Test Deliverables</Label>
              <Textarea
                value={formData.testDeliverables}
                onChange={(e) => setFormData({ ...formData, testDeliverables: e.target.value })}
                rows={3}
                placeholder="Test deliverables..."
              />
            </div>
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            {/* Roles and Responsibilities */}
            <div className="space-y-4">
              <Label>Roles and Responsibilities</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input
                    value={newRole.role}
                    onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                    placeholder="Role"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Responsibilities</Label>
                  <Input
                    value={newRole.responsibilities}
                    onChange={(e) => setNewRole({ ...newRole, responsibilities: e.target.value })}
                    placeholder="Responsibilities"
                  />
                </div>
                <div className="col-span-3">
                  <Button onClick={addRole} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Role
                  </Button>
                </div>
              </div>

              {formData.roles.map((role, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <strong>{role.name}</strong> - {role.role}: {role.responsibilities}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRole(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule & Milestones */}
            <div className="space-y-4">
              <Label>Schedule & Milestones</Label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Task</Label>
                  <Input
                    value={newSchedule.task}
                    onChange={(e) => setNewSchedule({ ...newSchedule, task: e.target.value })}
                    placeholder="Task"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker
                    selected={scheduleStartDate}
                    onChange={(date: Date) => setScheduleStartDate(date)}
                    className="w-full p-2 border rounded-md"
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Start date"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker
                    selected={scheduleEndDate}
                    onChange={(date: Date) => setScheduleEndDate(date)}
                    className="w-full p-2 border rounded-md"
                    dateFormat="MM/dd/yyyy"
                    placeholderText="End date"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Owner</Label>
                  <Input
                    value={newSchedule.owner}
                    onChange={(e) => setNewSchedule({ ...newSchedule, owner: e.target.value })}
                    placeholder="Owner"
                  />
                </div>
                <div className="col-span-4">
                  <Button onClick={addSchedule} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Schedule Item
                  </Button>
                </div>
              </div>

              {formData.schedule.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <strong>{item.task}</strong>: {item.startDate} to {item.endDate} (Owner: {item.owner})
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSchedule(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            {/* Risks and Mitigation */}
            <div className="space-y-4">
              <Label>Risks and Mitigation</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Risk</Label>
                  <Input
                    value={newRisk.risk}
                    onChange={(e) => setNewRisk({ ...newRisk, risk: e.target.value })}
                    placeholder="Risk"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Impact</Label>
                  <Input
                    value={newRisk.impact}
                    onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value })}
                    placeholder="Impact"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Mitigation</Label>
                  <Input
                    value={newRisk.mitigation}
                    onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
                    placeholder="Mitigation"
                  />
                </div>
                <div className="col-span-3">
                  <Button onClick={addRisk} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Risk
                  </Button>
                </div>
              </div>

              {formData.risks.map((risk, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <strong>{risk.risk}</strong> (Impact: {risk.impact}) - Mitigation: {risk.mitigation}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRisk(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Members */}
            <div className="space-y-4">
              <Label>Team Members</Label>
              <div className="flex gap-2">
                <Input
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  placeholder="Team member name"
                />
                <Button onClick={addMember}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.members.map((member, index) => (
                <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                  <span>{member}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            {planId ? "Update Plan" : "Create Plan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestPlanForm;