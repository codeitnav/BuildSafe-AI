import { Requirement } from "@/lib/mockData";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

interface RequirementCardProps {
  requirement: Requirement;
  isSelected: boolean;
  onClick: () => void;
}

const riskConfig = {
  high: { label: "HIGH", bgClass: "bg-risk-high", icon: AlertTriangle },
  medium: { label: "MED", bgClass: "bg-risk-medium", icon: AlertCircle },
  low: { label: "LOW", bgClass: "bg-risk-low", icon: CheckCircle },
};

const RequirementCard = ({ requirement, isSelected, onClick }: RequirementCardProps) => {
  const config = riskConfig[requirement.riskLevel];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left border-brutal p-4 transition-all ${
        isSelected
          ? "shadow-brutal-sm bg-muted translate-x-[2px] translate-y-[2px] shadow-none"
          : "shadow-brutal-sm hover:bg-muted/50"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-xs font-bold">{requirement.id}</span>
        <span
          className={`${config.bgClass} inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground`}
        >
          <Icon className="h-3 w-3" strokeWidth={3} />
          {config.label}
        </span>
      </div>
      <p className="text-sm font-medium leading-snug line-clamp-2">
        {requirement.originalText}
      </p>
      <p className="mt-2 font-mono text-[10px] text-muted-foreground">
        {requirement.issues.length} issue{requirement.issues.length !== 1 ? "s" : ""} found
      </p>
    </button>
  );
};

export default RequirementCard;
