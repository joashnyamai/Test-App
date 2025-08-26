import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BugReport } from "@/types/bug-report";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const bugReportSchema = z.object({
  title: z.string().min(1, "Title is required"),
  module: z.string().min(1, "Module is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  severity: z.enum(["Critical", "High", "Medium", "Low"]),
  priority: z.enum(["Critical", "High", "Medium", "Low"]),
  reportedBy: z.string().min(1, "Reporter name is required"),
  dateReported: z.string().min(1, "Date reported is required"),
  stepsToReproduce: z.string().min(1, "Steps to reproduce are required"),
  expectedResults: z.string().min(1, "Expected results are required"),
  actualResults: z.string().min(1, "Actual results are required"),
  assignedTo: z.string().min(1, "Assigned to is required"),
  environment: z.string().min(1, "Environment is required"),
  comments: z.string().optional(),
  remarks: z.string().optional(),
  dateResolved: z.string().optional(),
});

type BugReportFormValues = z.infer<typeof bugReportSchema>;

interface BugReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bug?: BugReport;
  onSubmit: (data: BugReportFormValues) => void;
}

export const BugReportForm = ({
  open,
  onOpenChange,
  bug,
  onSubmit,
}: BugReportFormProps) => {
  const [isEditing] = useState(!!bug);

  const form = useForm<BugReportFormValues>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: {
      title: "",
      module: "",
      shortDescription: "",
      severity: "Medium",
      priority: "Medium",
      reportedBy: "",
      dateReported: new Date().toISOString().split("T")[0],
      stepsToReproduce: "",
      expectedResults: "",
      actualResults: "",
      assignedTo: "",
      environment: "",
      comments: "",
      remarks: "",
      dateResolved: "",
    },
  });

  useEffect(() => {
    if (bug) {
      form.reset({
        title: bug.title,
        module: bug.module,
        shortDescription: bug.shortDescription,
        severity: bug.severity,
        priority: bug.priority,
        reportedBy: bug.reportedBy,
        dateReported: bug.dateReported,
        stepsToReproduce: bug.stepsToReproduce,
        expectedResults: bug.expectedResults,
        actualResults: bug.actualResults,
        assignedTo: bug.assignedTo,
        environment: bug.environment,
        comments: bug.comments,
        remarks: bug.remarks,
        dateResolved: bug.dateResolved || "",
      });
    } else {
      form.reset({
        title: "",
        module: "",
        shortDescription: "",
        severity: "Medium",
        priority: "Medium",
        reportedBy: "",
        dateReported: new Date().toISOString().split("T")[0],
        stepsToReproduce: "",
        expectedResults: "",
        actualResults: "",
        assignedTo: "",
        environment: "",
        comments: "",
        remarks: "",
        dateResolved: "",
      });
    }
  }, [bug, form, open]);

  const handleSubmit = (data: BugReportFormValues) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Bug Report" : "Create New Bug Report"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Bug title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="module"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Module *</FormLabel>
                    <FormControl>
                      <Input placeholder="Module name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reportedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reported By *</FormLabel>
                    <FormControl>
                      <Input placeholder="Reporter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateReported"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date Reported *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assigned To *</FormLabel>
                    <FormControl>
                      <Input placeholder="Team or person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="environment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Environment *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Production, Staging, Chrome v120" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief description of the bug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stepsToReproduce"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steps to Reproduce *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Step-by-step instructions to reproduce the bug" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Results *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What should happen" 
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actualResults"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Actual Results *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What actually happens" 
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comments</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional comments" 
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Remarks or notes" 
                      rows={2}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateResolved"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Resolved</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update Bug Report" : "Create Bug Report"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
