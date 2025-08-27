import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BugBash } from "@/types/bug-bash";

interface BugBashFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bugBash?: BugBash;
  onSubmit: (data: {
    title: string;
    participants: string[];
    startTime: string;
    endTime: string;
    results: string;
    remarks: string;
  }) => void;
}

export const BugBashForm = ({ open, onOpenChange, bugBash, onSubmit }: BugBashFormProps) => {
  const [title, setTitle] = useState(bugBash?.title || "");
  const [participants, setParticipants] = useState(bugBash?.participants || []);
  const [startTime, setStartTime] = useState(bugBash?.startTime || "");
  const [endTime, setEndTime] = useState(bugBash?.endTime || "");
  const [results, setResults] = useState(bugBash?.results || "");
  const [remarks, setRemarks] = useState(bugBash?.remarks || "");

  const handleSubmit = () => {
    onSubmit({
      title,
      participants,
      startTime,
      endTime,
      results,
      remarks,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{bugBash ? "Edit Bug Bash" : "New Bug Bash"}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Participants (comma separated)"
            value={participants.join(", ")}
            onChange={(e) => setParticipants(e.target.value.split(",").map(p => p.trim()))}
          />
          <Input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <Input
            placeholder="Results"
            value={results}
            onChange={(e) => setResults(e.target.value)}
          />
          <Input
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        
        <DialogFooter>
          <Button onClick={handleSubmit}>{bugBash ? "Update" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
