export interface BugReport {
  id: string;
  title: string;
  module: string;
  shortDescription: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  reportedBy: string;
  dateReported: string;
  stepsToReproduce: string;
  expectedResults: string;
  actualResults: string;
  assignedTo: string;
  environment: string;
  comments: string;
  remarks: string;
  dateResolved?: string; // Optional field
}
