import jsPDF from 'jspdf';
import { QaReport } from '@/types/qa-report';

export const generateQaReportPdf = (report: QaReport): void => {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text('QA REPORT', 105, 15, { align: 'center' });
  
  doc.setFontSize(16);
  doc.text(report.reportTitle, 105, 25, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text(`R A G Status: ${report.ragStatus}`, 105, 35, { align: 'center' });

  let yPosition = 45;

  // Project Information
  doc.setFontSize(12);
  doc.setTextColor(40, 40, 40);
  doc.text('Project Section:', 14, yPosition);
  doc.text(report.projectSection, 50, yPosition);
  yPosition += 8;
  
  doc.text('COHORT:', 14, yPosition);
  doc.text(report.cohort, 50, yPosition);
  yPosition += 8;
  
  doc.text('Project Name:', 14, yPosition);
  doc.text(report.projectName, 50, yPosition);
  yPosition += 8;
  
  doc.text('Start Date:', 14, yPosition);
  doc.text(report.startDate, 50, yPosition);
  yPosition += 8;
  
  doc.text('End Date:', 14, yPosition);
  doc.text(report.endDate, 50, yPosition);
  yPosition += 15;

  // Defects Distribution
  doc.setFontSize(14);
  doc.text('Defects Distribution:', 14, yPosition);
  yPosition += 10;

  // Create defects distribution table manually
  doc.setFontSize(10);
  doc.text('Severity/Priority', 14, yPosition);
  doc.text('Critical', 60, yPosition);
  doc.text('Major', 80, yPosition);
  doc.text('Medium', 100, yPosition);
  doc.text('Low', 120, yPosition);
  doc.text('Total', 140, yPosition);
  yPosition += 6;
  
  doc.text('High', 14, yPosition);
  doc.text(report.defectsDistribution.critical.toString(), 60, yPosition);
  doc.text(report.defectsDistribution.major.toString(), 80, yPosition);
  doc.text('', 100, yPosition);
  doc.text('', 120, yPosition);
  doc.text(report.defectsDistribution.total.toString(), 140, yPosition);
  yPosition += 6;
  
  doc.text('Medium', 14, yPosition);
  doc.text('', 60, yPosition);
  doc.text('', 80, yPosition);
  doc.text(report.defectsDistribution.medium.toString(), 100, yPosition);
  doc.text('', 120, yPosition);
  doc.text('', 140, yPosition);
  yPosition += 6;
  
  doc.text('Low', 14, yPosition);
  doc.text('', 60, yPosition);
  doc.text('', 80, yPosition);
  doc.text('', 100, yPosition);
  doc.text(report.defectsDistribution.low.toString(), 120, yPosition);
  doc.text('', 140, yPosition);
  yPosition += 15;

  // Test Distribution
  doc.setFontSize(14);
  doc.text('Test Distribution', 14, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.text(`Automated tests: ${report.testDistribution.automated}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Manual tests: ${report.testDistribution.manual}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Non-Functional: ${report.testDistribution.nonFunctional}`, 20, yPosition);
  yPosition += 15;

  // Test Case Execution
  doc.setFontSize(14);
  doc.text('Test Case Execution:', 14, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.text(`Total Test Cases: ${report.testCaseExecution.totalTestCases}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Test Cases Executed: ${report.testCaseExecution.testCasesExecuted}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Blocked Test Cases: ${report.testCaseExecution.blockedTestCases}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Passed Test Cases: ${report.testCaseExecution.passedTestCases}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Failed Test Cases: ${report.testCaseExecution.failedTestCases}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Skipped Test Cases: ${report.testCaseExecution.skippedTestCases}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Execution Rate: ${report.testCaseExecution.executionRate}%`, 20, yPosition);
  yPosition += 6;
  doc.text(`Pass Rate: ${report.testCaseExecution.passRate}%`, 20, yPosition);
  yPosition += 6;
  doc.text(`Fail Rate: ${report.testCaseExecution.failRate}%`, 20, yPosition);
  yPosition += 15;

  // Defects Status
  doc.setFontSize(14);
  doc.text('Defects Status', 14, yPosition);
  yPosition += 10;

  // Create defects status table manually
  doc.setFontSize(8);
  doc.text('State/Severity', 14, yPosition);
  doc.text('Critical', 50, yPosition);
  doc.text('Major', 70, yPosition);
  doc.text('Medium', 90, yPosition);
  doc.text('Low', 110, yPosition);
  yPosition += 5;
  
  doc.text('Open', 14, yPosition);
  doc.text(report.defectStatus.openCritical.toString(), 50, yPosition);
  doc.text(report.defectStatus.openMajor.toString(), 70, yPosition);
  doc.text(report.defectStatus.openMedium.toString(), 90, yPosition);
  doc.text(report.defectStatus.openLow.toString(), 110, yPosition);
  yPosition += 5;
  
  doc.text('Verified & Closed', 14, yPosition);
  doc.text(report.defectStatus.verifiedCritical.toString(), 50, yPosition);
  doc.text(report.defectStatus.verifiedMajor.toString(), 70, yPosition);
  doc.text(report.defectStatus.verifiedMedium.toString(), 90, yPosition);
  doc.text(report.defectStatus.verifiedLow.toString(), 110, yPosition);
  yPosition += 5;
  
  doc.text('Assigned', 14, yPosition);
  doc.text(report.defectStatus.assignedCritical.toString(), 50, yPosition);
  doc.text(report.defectStatus.assignedMajor.toString(), 70, yPosition);
  doc.text(report.defectStatus.assignedMedium.toString(), 90, yPosition);
  doc.text(report.defectStatus.assignedLow.toString(), 110, yPosition);
  yPosition += 5;
  
  doc.text('Rejected', 14, yPosition);
  doc.text(report.defectStatus.rejectedCritical.toString(), 50, yPosition);
  doc.text(report.defectStatus.rejectedMajor.toString(), 70, yPosition);
  doc.text(report.defectStatus.rejectedMedium.toString(), 90, yPosition);
  doc.text(report.defectStatus.rejectedLow.toString(), 110, yPosition);
  yPosition += 5;
  
  doc.text('Total Defects', 14, yPosition);
  doc.text('', 50, yPosition);
  doc.text(report.defectStatus.totalDefects.toString(), 70, yPosition);
  doc.text('', 90, yPosition);
  doc.text('', 110, yPosition);
  yPosition += 15;

  // Bug Details
  if (report.bugDetails.length > 0) {
    doc.setFontSize(14);
    doc.text('Bug Details', 14, yPosition);
    yPosition += 10;

    report.bugDetails.forEach((bug, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text(`BUG ID: ${bug.bugId}`, 14, yPosition);
      doc.text(`Title: ${bug.title}`, 14, yPosition + 6);
      yPosition += 12;

      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      
      // Steps to Produce
      doc.text('Steps to Produce:', 14, yPosition);
      yPosition += 6;
      
      const steps = bug.stepsToProduce.split('\n');
      steps.forEach(step => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(step.trim(), 20, yPosition);
        yPosition += 6;
      });

      // Bug details
      doc.text(`Severity: ${bug.severity}`, 14, yPosition);
      yPosition += 6;
      doc.text(`Priority: ${bug.priority}`, 14, yPosition);
      yPosition += 6;
      doc.text(`Actual Result: ${bug.actualResult}`, 14, yPosition);
      yPosition += 6;
      doc.text(`Status: ${bug.status}`, 14, yPosition);
      yPosition += 15;

      if (index < report.bugDetails.length - 1) {
        doc.setDrawColor(200, 200, 200);
        doc.line(14, yPosition, 196, yPosition);
        yPosition += 15;
      }
    });
  }

  // Save the PDF
  doc.save(`QA_Report_${report.reportTitle.replace(/\s+/g, '_')}_${report.id}.pdf`);
};
