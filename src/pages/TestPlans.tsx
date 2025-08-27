import React, { useState } from "react";
import { Download, Plus, Calendar, Users, FileText, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { generateTestPlanPDF } from "@/utils/test-pdf-generator";

export interface TestPlanData {
  projectName: string;
  version: string;
  preparedBy: string;
  dateCreated: string;
  reviewedBy: string;
  approvalDate: string;
  introduction: string;
  objectives: string;
  inScope: string;
  outOfScope: string;
  testItems: string;
  testStrategy: string;
  testEnvironment: string;
  entryCriteria: string;
  exitCriteria: string;
  testDeliverables: string;
  roles: Array<{ name: string; role: string; responsibilities: string }>;
  schedule: Array<{ task: string; startDate: string; endDate: string; owner: string }>;
  risks: Array<{ risk: string; impact: string; mitigation: string }>;
  members: string[];
}

export const TestPlans = () => {
  const [formData, setFormData] = useState<TestPlanData>({
    projectName: "JEWA PROPERTY – INFINITY PLATFORM",
    version: "1.0",
    preparedBy: "Group 4 - Attachment Team",
    dateCreated: new Date().toLocaleDateString(),
    reviewedBy: "Jacqueline Kamadi",
    approvalDate: "[Pending Approval]",
    introduction: "This Test Plan outlines the quality assurance (QA) strategy...",
    objectives: "To validate the core functionality of the platform...",
    inScope: "User Authentication (Login & Sign-Up)\nDashboard Navigation...",
    outOfScope: "Backend integrations (e.g., payment gateways, KRA eTIMS)...",
    testItems: "Registration\nLogin\nSidebar Navigation\nMenu Controls...",
    testStrategy: "Test Levels: System Testing, Regression Testing, User Acceptance Testing (UAT)...",
    testEnvironment: "Platform URL: https://jewapropertypro.com/infinity\nDevices: Windows 11...",
    entryCriteria: "Access to the live testing environment\nTest data/accounts prepared...",
    exitCriteria: "100% of test cases executed\nAll critical and high-severity defects resolved...",
    testDeliverables: "Approved Test Plan Document\nFunctional and UI Test Case Repository...",
    roles: [{ name: "Collins Odhiambo", role: "QA Tester", responsibilities: "Test case design..." }],
    schedule: [{ task: "Test Planning", startDate: "17/07/2025", endDate: "18/07/2025", owner: "Collins" }],
    risks: [{ risk: "Changes to production during testing", impact: "High", mitigation: "Perform tests during off-peak hours..." }],
    members: ["Collins Odhiambo"]
  });

  const handleInputChange = (field: keyof TestPlanData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (index: number, field: keyof TestPlanData['roles'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.map((role, i) => i === index ? { ...role, [field]: value } : role)
    }));
  };

  const handleScheduleChange = (index: number, field: keyof TestPlanData['schedule'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const handleRiskChange = (index: number, field: keyof TestPlanData['risks'][0], value: string) => {
    setFormData(prev => ({
      ...prev,
      risks: prev.risks.map((risk, i) => i === index ? { ...risk, [field]: value } : risk)
    }));
  };

  const handleMemberChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.map((m, i) => i === index ? value : m)
    }));
  };

  const addRole = () => setFormData(prev => ({ ...prev, roles: [...prev.roles, { name: "", role: "", responsibilities: "" }] }));
  const deleteRole = (index: number) => setFormData(prev => ({ ...prev, roles: prev.roles.filter((_, i) => i !== index) }));

  const addSchedule = () => setFormData(prev => ({ ...prev, schedule: [...prev.schedule, { task: "", startDate: "", endDate: "", owner: "" }] }));
  const deleteSchedule = (index: number) => setFormData(prev => ({ ...prev, schedule: prev.schedule.filter((_, i) => i !== index) }));

  const addRisk = () => setFormData(prev => ({ ...prev, risks: [...prev.risks, { risk: "", impact: "", mitigation: "" }] }));
  const deleteRisk = (index: number) => setFormData(prev => ({ ...prev, risks: prev.risks.filter((_, i) => i !== index) }));

  const addMember = () => setFormData(prev => ({ ...prev, members: [...prev.members, ""] }));
  const deleteMember = (index: number) => setFormData(prev => ({ ...prev, members: prev.members.filter((_, i) => i !== index) }));

  const handleGeneratePDF = () => generateTestPlanPDF(formData);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Plan Generator</h1>
          <p className="text-muted-foreground">Create and download professional test plans</p>
        </div>
        <Button onClick={handleGeneratePDF} className="gap-2">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Document Control */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Document Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input value={formData.projectName} onChange={e => handleInputChange('projectName', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Version</Label>
                <Input value={formData.version} onChange={e => handleInputChange('version', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Prepared By</Label>
                <Input value={formData.preparedBy} onChange={e => handleInputChange('preparedBy', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Date Created</Label>
                <Input value={formData.dateCreated} onChange={e => handleInputChange('dateCreated', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Reviewed By</Label>
                <Input value={formData.reviewedBy} onChange={e => handleInputChange('reviewedBy', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Approval Date</Label>
                <Input value={formData.approvalDate} onChange={e => handleInputChange('approvalDate', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Introduction */}
          <Card>
            <CardHeader><CardTitle>Introduction</CardTitle></CardHeader>
            <CardContent>
              <Textarea value={formData.introduction} onChange={e => handleInputChange('introduction', e.target.value)} rows={6} />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Objectives & Scope */}
          <Card>
            <CardHeader><CardTitle>Objectives and Scope</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Objectives</Label><Textarea value={formData.objectives} onChange={e => handleInputChange('objectives', e.target.value)} rows={3} /></div>
              <div><Label>In Scope</Label><Textarea value={formData.inScope} onChange={e => handleInputChange('inScope', e.target.value)} rows={3} /></div>
              <div><Label>Out of Scope</Label><Textarea value={formData.outOfScope} onChange={e => handleInputChange('outOfScope', e.target.value)} rows={2} /></div>
            </CardContent>
          </Card>

          {/* Test Items */}
          <Card>
            <CardHeader><CardTitle>Test Items / Features to be Tested</CardTitle></CardHeader>
            <CardContent><Textarea value={formData.testItems} onChange={e => handleInputChange('testItems', e.target.value)} rows={6} /></CardContent>
          </Card>

          {/* Test Strategy */}
          <Card>
            <CardHeader><CardTitle>Test Strategy</CardTitle></CardHeader>
            <CardContent><Textarea value={formData.testStrategy} onChange={e => handleInputChange('testStrategy', e.target.value)} rows={4} /></CardContent>
          </Card>

          {/* Test Environment */}
          <Card>
            <CardHeader><CardTitle>Test Environment</CardTitle></CardHeader>
            <CardContent><Textarea value={formData.testEnvironment} onChange={e => handleInputChange('testEnvironment', e.target.value)} rows={4} /></CardContent>
          </Card>
        </div>
      </div>

      {/* Entry & Exit Criteria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Entry & Exit Criteria</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Entry Criteria</Label><Textarea value={formData.entryCriteria} onChange={e => handleInputChange('entryCriteria', e.target.value)} rows={3} /></div>
            <div><Label>Exit Criteria</Label><Textarea value={formData.exitCriteria} onChange={e => handleInputChange('exitCriteria', e.target.value)} rows={3} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Test Deliverables</CardTitle></CardHeader>
          <CardContent><Textarea value={formData.testDeliverables} onChange={e => handleInputChange('testDeliverables', e.target.value)} rows={4} /></CardContent>
        </Card>
      </div>

      {/* Roles, Schedule, Risks, Members with CRUD */}
      {/* Roles */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Roles & Responsibilities</CardTitle>
          <Button onClick={addRole} variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Role</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.roles.map((role, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg items-end">
              <div><Label>Name</Label><Input value={role.name} onChange={e => handleRoleChange(index, 'name', e.target.value)} /></div>
              <div><Label>Role</Label><Input value={role.role} onChange={e => handleRoleChange(index, 'role', e.target.value)} /></div>
              <div><Label>Responsibilities</Label><Input value={role.responsibilities} onChange={e => handleRoleChange(index, 'responsibilities', e.target.value)} /></div>
              <Button variant="destructive" onClick={() => deleteRole(index)}><Trash className="w-4 h-4" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Schedule & Milestones</CardTitle>
          <Button onClick={addSchedule} variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Task</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.schedule.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-end">
              <div><Label>Task</Label><Input value={item.task} onChange={e => handleScheduleChange(index, 'task', e.target.value)} /></div>
              <div><Label>Start Date</Label><Input value={item.startDate} onChange={e => handleScheduleChange(index, 'startDate', e.target.value)} /></div>
              <div><Label>End Date</Label><Input value={item.endDate} onChange={e => handleScheduleChange(index, 'endDate', e.target.value)} /></div>
              <div><Label>Owner</Label><Input value={item.owner} onChange={e => handleScheduleChange(index, 'owner', e.target.value)} /></div>
              <Button variant="destructive" onClick={() => deleteSchedule(index)}><Trash className="w-4 h-4" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risks */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Risks & Mitigation</CardTitle>
          <Button onClick={addRisk} variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Risk</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.risks.map((risk, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg items-end">
              <div><Label>Risk</Label><Input value={risk.risk} onChange={e => handleRiskChange(index, 'risk', e.target.value)} /></div>
              <div><Label>Impact</Label><Input value={risk.impact} onChange={e => handleRiskChange(index, 'impact', e.target.value)} /></div>
              <div><Label>Mitigation</Label><Input value={risk.mitigation} onChange={e => handleRiskChange(index, 'mitigation', e.target.value)} /></div>
              <Button variant="destructive" onClick={() => deleteRisk(index)}><Trash className="w-4 h-4" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Team Members</CardTitle>
          <Button onClick={addMember} variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Add Member</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.members.map((member, index) => (
            <div key={index} className="flex items-end gap-4">
              <Input value={member} onChange={e => handleMemberChange(index, e.target.value)} />
              <Button variant="destructive" onClick={() => deleteMember(index)}><Trash className="w-4 h-4" /></Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
