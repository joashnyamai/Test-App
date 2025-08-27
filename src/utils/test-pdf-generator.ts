import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TestPlanData } from "@/pages/TestPlans";
import { TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.vfs;

export const generateTestPlanPDF = (data: TestPlanData) => {
  const docDefinition: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    header: {
      text: `${data.projectName} - Test Plan`,
      alignment: 'center',
      fontSize: 18,
      bold: true,
      margin: [0, 10, 0, 20]
    },
    footer: (currentPage: number, pageCount: number) => ({
      text: `Page ${currentPage} of ${pageCount}`,
      alignment: 'center',
      fontSize: 9,
      margin: [0, 0, 0, 10]
    }),
    content: [
      // Project Info
      {
        table: {
          widths: ['35%', '65%'],
          body: [
            ['Project Name', data.projectName],
            ['Version', data.version],
            ['Date Created', data.dateCreated],
            ['Prepared By', data.preparedBy],
            ['Reviewed By', data.reviewedBy],
            ['Approval Date', data.approvalDate]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Introduction
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Introduction', data.introduction]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Objectives
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Objectives', data.objectives]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Scope
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['In Scope', data.inScope],
            ['Out of Scope', data.outOfScope]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Test Items
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Test Items', data.testItems]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Test Strategy
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Test Strategy', data.testStrategy]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Test Environment
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Test Environment', data.testEnvironment]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Entry & Exit Criteria
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Entry Criteria', data.entryCriteria],
            ['Exit Criteria', data.exitCriteria]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Test Deliverables
      {
        table: {
          widths: ['25%', '*'],
          body: [
            ['Test Deliverables', data.testDeliverables]
          ]
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 15]
      },

      // Roles & Responsibilities
      {
        text: 'Roles & Responsibilities',
        style: 'sectionHeader',
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: ['25%', '25%', '50%'],
          body: [
            ['Name', 'Role', 'Responsibilities'],
            ...data.roles.map(r => [r.name, r.role, r.responsibilities])
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => (rowIndex === 0 ? '#eeeeee' : null),
          paddingTop: () => 6,
          paddingBottom: () => 6
        },
        margin: [0, 0, 0, 15]
      },

      // Schedule
      {
        text: 'Schedule',
        style: 'sectionHeader',
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: ['*', '20%', '20%', '*'],
          body: [
            ['Task', 'Start Date', 'End Date', 'Owner'],
            ...data.schedule.map(s => [s.task, s.startDate, s.endDate, s.owner])
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => (rowIndex === 0 ? '#eeeeee' : null),
          paddingTop: () => 6,
          paddingBottom: () => 6
        },
        margin: [0, 0, 0, 15]
      },

      // Risks & Mitigation
      {
        text: 'Risks & Mitigation',
        style: 'sectionHeader',
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: ['40%', '20%', '40%'],
          body: [
            ['Risk', 'Impact', 'Mitigation'],
            ...data.risks.map(r => [r.risk, r.impact, r.mitigation])
          ]
        },
        layout: {
          fillColor: (rowIndex: number) => (rowIndex === 0 ? '#eeeeee' : null),
          paddingTop: () => 6,
          paddingBottom: () => 6
        },
        margin: [0, 0, 0, 15]
      },

      // Team Members
      {
        text: 'Team Members',
        style: 'sectionHeader',
        margin: [0, 0, 0, 5]
      },
      {
        table: {
          widths: ['*'],
          body: data.members.map(m => [m])
        },
        layout: 'lightHorizontalLines',
        margin: [0, 0, 0, 20]
      }
    ],
    styles: {
      sectionHeader: {
        fontSize: 13,
        bold: true,
        color: '#003366'
      }
    },
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.4
    }
  };

  pdfMake.createPdf(docDefinition).download(`${data.projectName}_TestPlan.pdf`);
};
