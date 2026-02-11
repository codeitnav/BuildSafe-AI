import { Requirement } from "@/lib/mockData";
import { AlertTriangle, Lightbulb, Copy, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

interface RequirementDetailProps {
  requirement: Requirement;
}

const riskConfig = {
  high: { label: "HIGH RISK", bgClass: "bg-risk-high", icon: AlertTriangle },
  medium: { label: "MEDIUM RISK", bgClass: "bg-risk-medium", icon: AlertCircle },
  low: { label: "LOW RISK", bgClass: "bg-risk-low", icon: CheckCircle },
};

const RequirementDetail = ({ requirement }: RequirementDetailProps) => {
  const [copied, setCopied] = useState(false);
  const config = riskConfig[requirement.riskLevel];
  const Icon = config.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(requirement.suggestedRewrite);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-brutal p-6 shadow-brutal">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-sm font-bold">{requirement.id}</span>
        <span
          className={`${config.bgClass} inline-flex items-center gap-1 px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground`}
        >
          <Icon className="h-3.5 w-3.5" strokeWidth={3} />
          {config.label}
        </span>
      </div>

      {/* Original Text */}
      <div className="mb-6">
        <h4 className="mb-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
          Original Requirement
        </h4>
        <p className="border-l-[3px] border-foreground pl-4 text-sm font-medium leading-relaxed">
          "{requirement.originalText}"
        </p>
      </div>

      {/* Issues */}
      <div className="mb-6">
        <h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
          <AlertTriangle className="h-3.5 w-3.5 text-risk-high" strokeWidth={3} />
          Issues Detected
        </h4>
        <ul className="space-y-2">
          {requirement.issues.map((issue, i) => (
            <li
              key={i}
              className="border-brutal bg-muted p-3 text-sm font-medium"
            >
              {issue}
            </li>
          ))}
        </ul>
      </div>

      {/* Suggested Rewrite */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-muted-foreground">
          <Lightbulb className="h-3.5 w-3.5 text-risk-low" strokeWidth={3} />
          AI Suggested Rewrite
        </h4>
        <div className="border-brutal border-risk-low bg-background p-4" style={{ borderColor: "hsl(var(--risk-low))" }}>
          <p className="mb-3 font-mono text-sm leading-relaxed">
            {requirement.suggestedRewrite}
          </p>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 border-brutal bg-primary px-3 py-1.5 text-xs font-bold uppercase text-primary-foreground shadow-brutal-sm transition-all hover:shadow-brutal-hover hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            {copied ? (
              <>
                <CheckCircle className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy Rewrite
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequirementDetail;
