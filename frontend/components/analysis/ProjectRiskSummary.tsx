import { AnalysisResult } from "@/lib/mockData";
import { AlertTriangle, FileText, Search, Activity } from "lucide-react";

interface ProjectRiskSummaryProps {
  data: AnalysisResult;
}

const ProjectRiskSummary = ({ data }: ProjectRiskSummaryProps) => {
  const riskColor =
    data.projectRisk >= 70
      ? "text-risk-high"
      : data.projectRisk >= 40
      ? "text-risk-medium"
      : "text-risk-low";

  const riskBg =
    data.projectRisk >= 70
      ? "bg-risk-high"
      : data.projectRisk >= 40
      ? "bg-risk-medium"
      : "bg-risk-low";

  return (
    <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
      {/* Risk Score */}
      <div className="border-brutal p-6 lg:border-r-0">
        <div className="mb-2 flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Risk Score
          </span>
        </div>
        <div className="flex items-end gap-1">
          <span className={`font-mono text-5xl font-black ${riskColor}`}>
            {data.projectRisk}
          </span>
          <span className="mb-1 font-mono text-lg font-bold text-muted-foreground">
            /100
          </span>
        </div>
        <div className="mt-3 h-3 w-full border-brutal bg-muted">
          <div
            className={`h-full ${riskBg} transition-all`}
            style={{ width: `${data.projectRisk}%` }}
          />
        </div>
      </div>

      {/* Total Requirements */}
      <div className="border-brutal p-6 lg:border-r-0">
        <div className="mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Requirements
          </span>
        </div>
        <span className="font-mono text-5xl font-black">{data.totalRequirements}</span>
        <p className="mt-2 font-mono text-xs text-muted-foreground">total analyzed</p>
      </div>

      {/* High Risk */}
      <div className="border-brutal p-6 lg:border-r-0">
        <div className="mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-risk-high" strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            High Risk
          </span>
        </div>
        <span className="font-mono text-5xl font-black text-risk-high">{data.highRiskCount}</span>
        <p className="mt-2 font-mono text-xs text-muted-foreground">critical issues</p>
      </div>

      {/* Ambiguities */}
      <div className="border-brutal p-6">
        <div className="mb-2 flex items-center gap-2">
          <Search className="h-4 w-4 text-risk-medium" strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Ambiguities
          </span>
        </div>
        <span className="font-mono text-5xl font-black text-risk-medium">{data.ambiguitiesFound}</span>
        <p className="mt-2 font-mono text-xs text-muted-foreground">vague terms found</p>
      </div>
    </div>
  );
};

export default ProjectRiskSummary;
