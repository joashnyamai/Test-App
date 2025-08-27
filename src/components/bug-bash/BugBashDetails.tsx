import { BugBash } from "@/types/bug-bash";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface BugBashDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bugBash: BugBash;
}

export const BugBashDetails = ({
  open,
  onOpenChange,
  bugBash,
}: BugBashDetailsProps) => {
  if (!bugBash) {
    return null; // Early return if bugBash is undefined
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Bug Bash Session Details</span>
            <span className="text-sm font-normal text-muted-foreground">
              {bugBash.id}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Session Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Title:</span>
                  <span className="font-medium">{bugBash.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Time:</span>
                  <span>{bugBash.startTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Time:</span>
                  <span>{bugBash.endTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bugs Found:</span>
                  <span>{bugBash.bugsReported.length}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Participants</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Participants:</span>
                  <span>{bugBash.participants.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Participants List:</span>
                  <ul className="mt-1 space-y-1">
                    {bugBash.participants.map((participant, index) => (
                      <li key={index} className="text-sm">• {participant}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Results */}
          {bugBash.results && (
            <div>
              <h3 className="font-semibold mb-2">Results</h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                {bugBash.results}
              </p>
            </div>
          )}

          {/* Remarks */}
          {bugBash.remarks && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Remarks</h3>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                  {bugBash.remarks}
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
