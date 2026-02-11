import { FileText, AlertTriangle, Zap, BarChart3, Brain, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "PDF & DOCX Support",
    description: "Upload requirement documents in any format. We extract and parse everything.",
  },
  {
    icon: AlertTriangle,
    title: "Ambiguity Detection",
    description: "NLP models flag vague words like 'fast', 'easy', and 'should' that kill projects.",
  },
  {
    icon: BarChart3,
    title: "Risk Scoring",
    description: "Every requirement gets a quantified risk score. See your project health at a glance.",
  },
  {
    icon: Brain,
    title: "AI Rewrites",
    description: "Get concrete, testable rewrites for every flagged requirement. Copy and ship.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description: "Results in seconds, not days. No more week-long requirement review meetings.",
  },
  {
    icon: ShieldCheck,
    title: "Export Reports",
    description: "Download PDF reports to share with stakeholders. Professional and audit-ready.",
  },
];

const Features = () => {
  return (
    <section className="border-b-[3px] border-foreground">
      <div className="container mx-auto px-6 py-16">
        <h2 className="mb-12 text-3xl font-black uppercase tracking-tight md:text-4xl">
          What It Does
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`border-brutal p-6 ${
                index < 3 ? "lg:border-b-0" : ""
              } ${index % 3 !== 2 ? "lg:border-r-0" : ""} ${
                index % 2 !== 1 ? "md:border-r-0 lg:border-r-0" : ""
              } ${index < features.length - 2 ? "md:border-b-0" : ""}`}
            >
              <feature.icon className="mb-4 h-8 w-8" strokeWidth={2.5} />
              <h3 className="mb-2 text-lg font-black uppercase">{feature.title}</h3>
              <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
