import { BugReport } from "@/types/bug-report";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface BugReportDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bug: BugReport;
}

export const BugReportDetails = ({
  open,
  onOpenChange,
  bug,
}: BugReportDetailsProps) => {
  if (!bug) {
    return null; // Early return if bug is undefined
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Critical</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bug Report Details</span>
            <span className="text-sm font-normal text-muted-foreground">
              {bug.id}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{bug.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Module:</span>
                  <span>{bug.module}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Severity:</span>
                  <span>{getSeverityBadge(bug.severity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Priority:</span>
                  <span>{getPriorityBadge(bug.priority)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Assignment & Dates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reported By:</span>
                  <span>{bug.reportedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Reported:</span>
                  <span>{bug.dateReported}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned To:</span>
                  <span>{bug.assignedTo}</span>
                </div>
                {bug.dateResolved && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date Resolved:</span>
                    <span>{bug.dateResolved}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Environment:</span>
                  <span>{bug.environment}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
              {bug.shortDescription}
            </p>
          </div>

          <Separator />

          {/* Steps to Reproduce */}
          <div>
            <h3 className="font-semibold mb-2">Steps to Reproduce</h3>
            <div className="bg-muted/50 p-3 rounded-md">
              <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                {bug.stepsToReproduce}
              </pre>
            </div>
          </div>

          <Separator />

          {/* Expected vs Actual Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Expected Results</h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                {bug.expectedResults}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Actual Results</h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                {bug.actualResults}
              </p>
            </div>
          </div>

          {/* Comments and Remarks */}
          {(bug.comments || bug.remarks) && <Separator />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bug.comments && (
              <div>
                <h3 className="font-semibold mb-2">Comments</h3>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {bug.comments}
                </p>
              </div>
            )}
            {bug.remarks && (
              <div>
                <h3 className="font-semibold mb-2">Remarks</h3>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {bug.remarks}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
