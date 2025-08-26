import { useRef } from "react";
import { useBugReportStore } from "@/store/bug-report-store";
import { Button } from "@/components/ui/button";
import { Upload, Download } from "lucide-react";
import { ChangeEvent } from "react";

export const BugReportExcelButtons = () => {
  const { importBugReports, exportBugReports } = useBugReportStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    importBugReports(file).catch((error) => {
      console.error("Error importing bug reports:", error);
      alert("Failed to import bug reports. Please check the file format.");
    });
    
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={exportBugReports}>
        <Download className="w-4 h-4 mr-2" />
        Export Excel
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleImport}
      />
      <Button variant="outline" onClick={() => fileRef.current?.click()}>
        <Upload className="w-4 h-4 mr-2" />
        Import Excel
      </Button>
    </div>
  );
};
