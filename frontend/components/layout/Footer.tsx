import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-[3px] border-foreground bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" strokeWidth={2.5} />
            <span className="text-sm font-black uppercase tracking-tight">BuildSafe AI</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 BUILDSAFE AI — SHIP SAFER SOFTWARE.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
