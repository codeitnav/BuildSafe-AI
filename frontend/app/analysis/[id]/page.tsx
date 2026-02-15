"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Download, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectRiskSummary from "@/components/analysis/ProjectRiskSummary";
import RequirementCard from "@/components/analysis/RequirementCard";
import RequirementDetail from "@/components/analysis/RequirementIssues";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const getOwnerId = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("buildsafe_user_id") || "";
};

const AnalysisResultPage = () => {
  const params = useParams();
  const analysisId = params?.id as string;

  const [data, setData] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const ownerId = getOwnerId();

        const res = await fetch(
          `${API_BASE_URL}/api/analysis/${analysisId}?ownerId=${ownerId}`
        );

        const json = await res.json();

        if (!json.success) throw new Error(json.message);

        const analysis = json.analysis;

        const highRiskCount = analysis.results.filter(
          (r: any) => r.risk.riskLevel === "High"
        ).length;

        const ambiguitiesFound = analysis.results.reduce(
          (acc: number, r: any) =>
            acc +
            r.issues.filter((i: any) => i.type === "Ambiguity").length,
          0
        );

        const projectRiskScore =
          analysis.projectRisk.projectRisk === "High"
            ? 85
            : analysis.projectRisk.projectRisk === "Medium"
            ? 55
            : 20;

        const mapped = {
          projectName: analysis.sourceFileName,
          date: new Date(analysis.createdAt).toLocaleDateString(),
          projectRisk: projectRiskScore,
          totalRequirements: analysis.totalRequirements,
          highRiskCount,
          ambiguitiesFound,
          requirements: analysis.results.map((r: any, index: number) => ({
            id: `REQ-${index + 1}`,
            originalText: r.requirement,
            riskLevel:
              r.risk.riskLevel.toLowerCase(), // high | medium | low
            issues: r.issues.map((i: any) => i.message),
            suggestedRewrite: r.aiAnalysis?.suggestedRewrite || r.requirement,
          })),
        };

        setData(mapped);
        setSelectedId(mapped.requirements[0]?.id || null);
      } catch (error) {
        console.error("Fetch analysis error:", error);
      }
    };

    if (analysisId) fetchAnalysis();
  }, [analysisId]);

  const handleExport = async () => {
    try {
      const ownerId = getOwnerId();

      const res = await fetch(
        `${API_BASE_URL}/api/analysis/${analysisId}/export/pdf?ownerId=${ownerId}`
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `BuildSafe_Report_${analysisId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading analysis...
      </div>
    );
  }

  const selectedReq = data.requirements.find(
    (r: any) => r.id === selectedId
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight">
                {data.projectName}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="font-mono text-xs">{data.date}</span>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 border-brutal bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brutal transition-all hover:shadow-brutal-hover hover:translate-x-[4px] hover:translate-y-[4px]"
            >
              <Download className="h-4 w-4" strokeWidth={2.5} />
              Export PDF
            </button>
          </div>

          <div className="mb-8">
            <ProjectRiskSummary data={data} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Requirements ({data.totalRequirements})
              </h3>
              <div className="space-y-3">
                {data.requirements.map((req: any) => (
                  <RequirementCard
                    key={req.id}
                    requirement={req}
                    isSelected={selectedId === req.id}
                    onClick={() => setSelectedId(req.id)}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start">
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Detail View
              </h3>
              {selectedReq && (
                <RequirementDetail requirement={selectedReq} />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalysisResultPage;
