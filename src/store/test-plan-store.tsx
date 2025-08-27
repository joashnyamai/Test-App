import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TestPlanData } from "@/pages/TestPlans";

interface TestPlanState {
  testPlans: TestPlanData[];
  addTestPlan: (plan: TestPlanData) => void;
  updateTestPlan: (id: string, plan: Partial<TestPlanData>) => void;
  deleteTestPlan: (id: string) => void;
  getTestPlan: (id: string) => TestPlanData | undefined;
}

const seed: TestPlanData[] = [
  {
    projectName: "Sample Project",
    version: "1.0",
    preparedBy: "Team A",
    dateCreated: new Date().toLocaleDateString(),
    reviewedBy: "Reviewer A",
    approvalDate: "[Pending Approval]",
    introduction: "This is a sample test plan.",
    objectives: "To validate the functionality of the sample project.",
    inScope: "User authentication, data processing.",
    outOfScope: "Payment processing.",
    testItems: "Login, Registration, Data Entry.",
    testStrategy: "Functional Testing, Regression Testing.",
    testEnvironment: "Development Environment.",
    entryCriteria: "Test data prepared.",
    exitCriteria: "All critical defects resolved.",
    testDeliverables: "Test Plan Document, Test Cases.",
    roles: [
      { name: "Tester A", role: "QA Tester", responsibilities: "Test execution." },
      { name: "Tester B", role: "QA Lead", responsibilities: "Test planning." }
    ],
    schedule: [
      { task: "Test Planning", startDate: "01/01/2023", endDate: "01/02/2023", owner: "Tester A" }
    ],
    risks: [
      { risk: "Insufficient test data", impact: "High", mitigation: "Prepare comprehensive test data." }
    ],
    members: ["Tester A", "Tester B"]
  }
];

export const useTestPlanStore = create<TestPlanState>()(
  persist(
    (set, get) => ({
      testPlans: seed,
      
      addTestPlan: (plan) => 
        set((state) => ({ 
          testPlans: [...state.testPlans, plan] 
        })),
      
      updateTestPlan: (id, plan) =>
        set((state) => ({
          testPlans: state.testPlans.map((p) =>
            p.projectName === id ? { ...p, ...plan } : p
          )
        })),
      
      deleteTestPlan: (id) =>
        set((state) => ({
          testPlans: state.testPlans.filter((p) => p.projectName !== id)
        })),
      
      getTestPlan: (id) =>
        get().testPlans.find((p) => p.projectName === id)
    }),
    { 
      name: "test-plan-store",
      version: 1
    }
  )
);
