import PDFDocument from "pdfkit";

/*
  @desc    Generate a PDF buffer for an analysis report
  @params  analysis {Object}
  @returns {Promise<Buffer>}
*/
export const generateAnalysisPDF = (analysis) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 40 });
            const buffers = [];

            doc.on("data", buffers.push.bind(buffers));
            doc.on("end", () => resolve(Buffer.concat(buffers)));

            // Title 
            doc
                .fontSize(20)
                .text("BuildSafe AI - Requirement Risk Analysis Report", {
                    align: "center"
                })
                .moveDown(1.5);

            // Project Summary 
            doc
                .fontSize(14)
                .text("Project Risk Summary", { underline: true })
                .moveDown(0.5);

            doc.fontSize(11).text(`Project Risk Level: ${analysis.projectRisk.projectRisk}`);
            doc.text(`Total Requirements: ${analysis.totalRequirements}`);
            doc.text(`Medium Risk Requirements: ${analysis.projectRisk.mediumRiskCount}`);
            doc.text(`High Risk Requirements: ${analysis.projectRisk.highRiskCount}`);
            doc.text(`Generated On: ${analysis.createdAt.toISOString()}`);
            doc.moveDown(1.5);

            // Requirements 
            doc
                .fontSize(14)
                .text("Requirement Analysis", { underline: true })
                .moveDown(1);

            analysis.results.forEach((item, index) => {
                doc
                    .fontSize(12)
                    .text(`Requirement ${index + 1}:`, { bold: true })
                    .moveDown(0.3);

                doc.fontSize(10).text(item.requirement);
                doc.moveDown(0.3);

                doc.text(`Risk Level: ${item.risk.riskLevel}`);
                doc.text(`Rule Score: ${item.risk.ruleScore}`);
                doc.text(`AI Score: ${item.risk.aiScore}`);

                if (item.issues.length > 0) {
                    doc.moveDown(0.3);
                    doc.text("Detected Issues:");
                    item.issues.forEach(issue => {
                        doc.text(`- ${issue.type}: ${issue.message}`);
                    });
                }

                doc.moveDown(0.3);
                doc.text("AI Explanation:");
                doc.text(item.aiAnalysis.explanation);

                doc.moveDown(0.3);
                doc.text("Suggested Rewrite:");
                doc.text(item.aiAnalysis.suggestedRewrite);

                doc.moveDown(1);
            });

            doc.end();
        } catch (error) {
            reject(error);
        }
    });
};
