import React, { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTestPlanPDF } from "@/utils/test-pdf-generator";
import { TestPlanList } from "@/components/test-plan/TestPlanList";
import TestPlanForm from "@/components/test-plan/TestPlanForm";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | undefined>();

  const handleCreateNewPlan = () => {
    setEditingPlanId(undefined);
    setIsFormOpen(true);
  };

  const handleEditPlan = (planId: string) => {
    setEditingPlanId(planId);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingPlanId(undefined);
  };

  return (
    <div className="space-y-6">
      <TestPlanList onEdit={handleEditPlan} onCreate={handleCreateNewPlan} />
      
      <TestPlanForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        planId={editingPlanId}
        onSuccess={handleFormSuccess}
      />
    </div>
  );
};
