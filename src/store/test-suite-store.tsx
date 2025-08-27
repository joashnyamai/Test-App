import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TestCase {
  id: string;
  title: string;
  preconditions: string;
  testSteps: string;
  testData: string;
  expectedResults: string;
  actualResults: string;
  status: string;
  executedBy: string;
  executionDate: string;
  remarks: string;
  testedBy: string;
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  testCases: TestCase[];
  status: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface TestSuiteState {
  testSuites: TestSuite[];
  addTestSuite: (suite: TestSuite) => void;
  updateTestSuite: (id: string, patch: Partial<TestSuite>) => void;
  deleteTestSuite: (id: string) => void;
}

const seed: TestSuite[] = [
  {
    id: "TS-001",
    name: "Login Functionality",
    description: "Test cases for user login functionality",
    testCases: [
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
      }
    ],
    status: "Active",
    owner: "John Doe",
    createdAt: "2025-08-20",
    updatedAt: "2025-08-21"
  },
  {
    id: "TS-002",
    name: "User Registration",
    description: "Test cases for new user registration",
    testCases: [
      {
        id: "TC-003",
        title: "Register with valid information",
        preconditions: "No user account exists",
        testSteps: "Open registration → fill valid info → submit",
        testData: "name: Test User, email: test@example.com, password: Pass@123",
        expectedResults: "User account created successfully",
        actualResults: "Account created",
        status: "Passed",
        executedBy: "Jane Smith",
        executionDate: "2025-08-19",
        remarks: "OK",
        testedBy: "QA Team",
      }
    ],
    status: "Active",
    owner: "Jane Smith",
    createdAt: "2025-08-19",
    updatedAt: "2025-08-19"
  }
];

export const useTestSuiteStore = create<TestSuiteState>()(
  persist(
    (set) => ({
      testSuites: seed,
      addTestSuite: (suite) => set((s) => ({ testSuites: [...s.testSuites, suite] })),
      updateTestSuite: (id, patch) =>
        set((s) => ({
          testSuites: s.testSuites.map((suite) =>
            suite.id === id ? { ...suite, ...patch, updatedAt: new Date().toISOString().split('T')[0] } : suite
          ),
        })),
      deleteTestSuite: (id) =>
        set((s) => ({ testSuites: s.testSuites.filter((suite) => suite.id !== id) })),
    }),
    { name: "test-suite-store" }
  )
);
