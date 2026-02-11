"use client"

import { useState } from "react";
import { Download, Calendar } from "lucide-react";
import { mockAnalysisResult } from "@/lib/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectRiskSummary from "@/components/analysis/ProjectRiskSummary";
import RequirementCard from "@/components/analysis/RequirementCard";
import RequirementDetail from "@/components/analysis/RequirementIssues";

const AnalysisResultPage = () => {
  const data = mockAnalysisResult;
  const [selectedId, setSelectedId] = useState(data.requirements[0].id);
  const selectedReq = data.requirements.find((r) => r.id === selectedId)!;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
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
            <button className="inline-flex items-center gap-2 border-brutal bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-brutal transition-all hover:shadow-brutal-hover hover:translate-x-[4px] hover:translate-y-[4px]">
              <Download className="h-4 w-4" strokeWidth={2.5} />
              Export PDF
            </button>
          </div>

          {/* Summary */}
          <div className="mb-8">
            <ProjectRiskSummary data={data} />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left: Requirement List */}
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Requirements ({data.totalRequirements})
              </h3>
              <div className="space-y-3">
                {data.requirements.map((req) => (
                  <RequirementCard
                    key={req.id}
                    requirement={req}
                    isSelected={selectedId === req.id}
                    onClick={() => setSelectedId(req.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right: Detail View */}
            <div className="lg:col-span-3 lg:sticky lg:top-8 lg:self-start">
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-muted-foreground">
                Detail View
              </h3>
              <RequirementDetail requirement={selectedReq} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalysisResultPage;
