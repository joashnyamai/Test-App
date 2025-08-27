import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTestSuiteStore, TestSuite } from "@/store/test-suite-store";

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

  useEffect(() => {
    if (suiteId) {
      const suite = testSuites.find(s => s.id === suiteId);
      if (suite) {
        setName(suite.name);
        setDescription(suite.description);
      }
    } else {
      setName("");
      setDescription("");
    }
  }, [suiteId, testSuites]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const suiteData: TestSuite = {
      id: suiteId || new Date().toISOString(), // Generate a new ID if creating a new suite
      name,
      description,
      testCases: [],
      status: "Active",
      owner: "Current User", // Replace with actual user data
      createdAt: new Date().toISOString(),
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input 
            placeholder="Suite Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <Input 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Dialog>
  );
};

export default TestSuiteForm;
