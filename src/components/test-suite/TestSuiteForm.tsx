import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTestSuiteStore, TestSuite } from "@/store/test-suite-store";

// Mock data for available test cases
const availableTestCases = [
  { id: 'tc1', name: 'Login Functionality' },
  { id: 'tc2', name: 'User Registration' },
  { id: 'tc3', name: 'Password Reset' },
  { id: 'tc4', name: 'Profile Update' },
  { id: 'tc5', name: 'Search Functionality' },
  { id: 'tc6', name: 'Checkout Process' },
  { id: 'tc7', name: 'Payment Gateway' },
  { id: 'tc8', name: 'Email Notifications' }
];

interface TestSuiteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suiteId?: string;
  onSuccess: () => void;
}

const TestSuiteForm: React.FC<TestSuiteFormProps> = ({ open, onOpenChange, suiteId, onSuccess }) => {
  const { testSuites, addTestSuite, updateTestSuite } = useTestSuiteStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);

  useEffect(() => {
    if (suiteId) {
      const suite = testSuites.find(s => s.id === suiteId);
      if (suite) {
        setName(suite.name);
        setDescription(suite.description);
        setSelectedTestCases(suite.testCases || []);
      }
    } else {
      setName("");
      setDescription("");
      setSelectedTestCases([]);
    }
  }, [suiteId, testSuites]);

  const handleTestCaseToggle = (testCaseId: string) => {
    setSelectedTestCases(prev => {
      if (prev.includes(testCaseId)) {
        return prev.filter(id => id !== testCaseId);
      } else {
        return [...prev, testCaseId];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suiteData: TestSuite = {
      id: suiteId || new Date().toISOString(),
      name,
      description,
      testCases: selectedTestCases,
      status: "Active",
      owner: "Current User",
      createdAt: suiteId ? testSuites.find(s => s.id === suiteId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (suiteId) {
      updateTestSuite(suiteId, suiteData);
    } else {
      addTestSuite(suiteData);
    }
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          {suiteId ? 'Edit Test Suite' : 'Create New Test Suite'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Suite Name</Label>
              <Input
                id="name"
                placeholder="Enter suite name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label>Select Test Cases</Label>
              <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                {availableTestCases.map(testCase => (
                  <div key={testCase.id} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={testCase.id}
                      checked={selectedTestCases.includes(testCase.id)}
                      onCheckedChange={() => handleTestCaseToggle(testCase.id)}
                    />
                    <Label
                      htmlFor={testCase.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {testCase.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {suiteId ? 'Update' : 'Create'} Suite
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default TestSuiteForm;