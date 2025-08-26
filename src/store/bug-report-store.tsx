import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BugReport } from "@/types/bug-report";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface BugReportState {
  bugReports: BugReport[];
  addBugReport: (report: BugReport) => void;
  updateBugReport: (id: string, report: Partial<BugReport>) => void;
  deleteBugReport: (id: string) => void;
  getBugReport: (id: string) => BugReport | undefined;
  importBugReports: (file: File) => Promise<void>;
  exportBugReports: () => void;
}

const seed: BugReport[] = [
  {
    id: "BUG-001",
    title: "Login button not responsive on mobile",
    module: "Authentication",
    shortDescription: "Login button doesn't respond to clicks on mobile devices",
    severity: "High",
    priority: "High",
    reportedBy: "John Doe",
    dateReported: "2024-01-15",
    stepsToReproduce: "1. Open app on mobile device\n2. Navigate to login page\n3. Try to click login button",
    expectedResults: "Login button should respond to clicks and initiate login process",
    actualResults: "Login button does nothing when clicked",
    assignedTo: "Dev Team A",
    environment: "Mobile - iOS Safari",
    comments: "Affects all mobile browsers",
    remarks: "High priority for mobile users",
    dateResolved: ""
  },
  {
    id: "BUG-002",
    title: "Payment gateway timeout error",
    module: "Payment",
    shortDescription: "Payment processing times out after 30 seconds",
    severity: "Critical",
    priority: "Critical",
    reportedBy: "Jane Smith",
    dateReported: "2024-01-14",
    stepsToReproduce: "1. Add items to cart\n2. Proceed to checkout\n3. Enter payment details\n4. Submit payment",
    expectedResults: "Payment should process successfully within 10 seconds",
    actualResults: "Payment times out after 30 seconds with error",
    assignedTo: "Dev Team B",
    environment: "Production - All browsers",
    comments: "Occurs with all payment methods",
    remarks: "Critical issue affecting revenue",
    dateResolved: ""
  },
  {
    id: "BUG-003",
    title: "Search results not loading",
    module: "Search",
    shortDescription: "Search results page shows loading spinner indefinitely",
    severity: "Medium",
    priority: "Medium",
    reportedBy: "Mike Johnson",
    dateReported: "2024-01-13",
    stepsToReproduce: "1. Enter search term in search bar\n2. Press enter or click search button",
    expectedResults: "Search results should load within 2 seconds",
    actualResults: "Loading spinner shows indefinitely, no results displayed",
    assignedTo: "Dev Team A",
    environment: "Staging - Chrome v120",
    comments: "Only affects certain search terms",
    remarks: "Medium priority - affects user experience",
    dateResolved: "2024-01-15"
  }
];

export const useBugReportStore = create<BugReportState>()(
  persist(
    (set, get) => ({
      bugReports: seed,
      
      addBugReport: (report) => 
        set((state) => ({ 
          bugReports: [...state.bugReports, report] 
        })),
      
      updateBugReport: (id, report) =>
        set((state) => ({
          bugReports: state.bugReports.map((r) =>
            r.id === id ? { ...r, ...report } : r
          )
        })),
      
      deleteBugReport: (id) =>
        set((state) => ({
          bugReports: state.bugReports.filter((r) => r.id !== id)
        })),
      
      getBugReport: (id) =>
        get().bugReports.find((r) => r.id === id),

      importBugReports: async (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            try {
              const data = new Uint8Array(evt.target?.result as ArrayBuffer);
              const wb = XLSX.read(data, { type: "array" });
              const ws = wb.Sheets[wb.SheetNames[0]];
              const rows = XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[];
              
              // Map Excel columns to BugReport fields
              const importedBugs: BugReport[] = rows.map((row, index) => ({
                id: (row['Bug ID'] as string) || `IMPORTED-${Date.now()}-${index}`,
                title: (row['Title'] as string) || '',
                module: (row['Module'] as string) || '',
                shortDescription: (row['Short Description'] as string) || '',
                severity: (row['Severity'] as 'Critical' | 'High' | 'Medium' | 'Low') || 'Medium',
                priority: (row['Priority'] as 'Critical' | 'High' | 'Medium' | 'Low') || 'Medium',
                reportedBy: (row['Reported By'] as string) || '',
                dateReported: (row['Date Reported'] as string) || new Date().toISOString().split('T')[0],
                stepsToReproduce: (row['Steps to Reproduce'] as string) || '',
                expectedResults: (row['Expected Results'] as string) || '',
                actualResults: (row['Actual Results'] as string) || '',
                assignedTo: (row['Assigned To'] as string) || '',
                environment: (row['Environment'] as string) || '',
                comments: (row['Comments'] as string) || '',
                remarks: (row['Remarks'] as string) || '',
                dateResolved: (row['Date Resolved'] as string) || ''
              }));

              set((state) => ({
                bugReports: [...state.bugReports, ...importedBugs]
              }));
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(file);
        });
      },

      exportBugReports: () => {
        const { bugReports } = get();
        
        // Prepare data for Excel export
        const exportData = bugReports.map(bug => ({
          'Bug ID': bug.id,
          'Title': bug.title,
          'Module': bug.module,
          'Short Description': bug.shortDescription,
          'Severity': bug.severity,
          'Priority': bug.priority,
          'Reported By': bug.reportedBy,
          'Date Reported': bug.dateReported,
          'Steps to Reproduce': bug.stepsToReproduce,
          'Expected Results': bug.expectedResults,
          'Actual Results': bug.actualResults,
          'Assigned To': bug.assignedTo,
          'Environment': bug.environment,
          'Comments': bug.comments,
          'Remarks': bug.remarks,
          'Date Resolved': bug.dateResolved || ''
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Bug Reports");
        const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        saveAs(blob, "bug-reports.xlsx");
      }
    }),
    { 
      name: "bug-report-store",
      version: 1
    }
  )
);
