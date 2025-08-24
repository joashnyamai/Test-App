import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TestStatus = "Not Run" | "Passed" | "Failed" | "Blocked";

export interface TestCase {
  id: string;
  title: string;
  preconditions: string;
  testSteps: string;
  testData: string;
  expectedResults: string;
  actualResults: string;
  status: TestStatus;
  executedBy: string;
  executionDate: string; // "YYYY-MM-DD"
  remarks: string;
  testedBy: string;
}

interface TestCaseState {
  testCases: TestCase[];
  addTestCase: (tc: TestCase) => void;
  setTestCases: (tcs: TestCase[]) => void;
  updateTestCase: (id: string, patch: Partial<TestCase>) => void;
  removeTestCase: (id: string) => void;
}

const seed: TestCase[] = [
  {
    id: "TC-001",
    title: "Login with valid credentials",
    preconditions: "User account exists",
    testSteps: "Open login → enter valid creds → click Login",
    testData: "username: testuser / password: Pass@123",
    expectedResults: "User redirected to dashboard",
    actualResults: "As expected",
    status: "Passed",
    executedBy: "John Doe",
    executionDate: "2025-08-21",
    remarks: "OK",
    testedBy: "QA Team",
  },
  {
    id: "TC-002",
    title: "Login with invalid password",
    preconditions: "User account exists",
    testSteps: "Open login → enter wrong password → click Login",
    testData: "username: testuser / password: Wrong",
    expectedResults: "Error shown: Invalid credentials",
    actualResults: "Error shows",
    status: "Passed",
    executedBy: "Jane Smith",
    executionDate: "2025-08-20",
    remarks: "OK",
    testedBy: "QA Team",
  },
];

export const useTestCaseStore = create<TestCaseState>()(
  persist(
    (set) => ({
      testCases: seed,
      addTestCase: (tc) => set((s) => ({ testCases: [...s.testCases, tc] })),
      setTestCases: (tcs) => set(() => ({ testCases: tcs })),
      updateTestCase: (id, patch) =>
        set((s) => ({
          testCases: s.testCases.map((t) =>
            t.id === id ? { ...t, ...patch } : t
          ),
        })),
      removeTestCase: (id) =>
        set((s) => ({ testCases: s.testCases.filter((t) => t.id !== id) })),
    }),
    { name: "testcase-store" }
  )
);
