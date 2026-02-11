"use client"

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Terminal } from "lucide-react";
import { terminalSteps } from "@/lib/mockData";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const getOrCreateAnonymousId = () => {
  if (typeof window === "undefined") return "";

  let id = localStorage.getItem("buildsafe_user_id");

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("buildsafe_user_id", id);
  }

  return id;
};

const AnalysisPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"paste" | "upload">("paste");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;

    try {
      setIsAnalyzing(true);
      setTerminalLines([]);

      const ownerId = getOrCreateAnonymousId();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("ownerType", "anonymous");
      formData.append("ownerId", ownerId);

      const response = await fetch(`${API_BASE_URL}/api/extract`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Analysis failed");
      }

      terminalSteps.forEach((step, i) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, step]);

          if (i === terminalSteps.length - 1) {
            setTimeout(() => {
              router.push(`/analysis/${data.analysisId}`);
            }, 800);
          }
        }, (i + 1) * 400);
      });

    } catch (error) {
      console.error("Analysis error:", error);
      setIsAnalyzing(false);
    }
  }, [file, router]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && /\.(pdf|doc|docx)$/i.test(dropped.name)) {
      setFile(dropped);
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12">
          <h1 className="mb-2 text-4xl font-black uppercase tracking-tight">
            New Analysis
          </h1>
          <p className="mb-8 text-muted-foreground font-medium">
            Paste your requirements or upload a document to begin risk detection.
          </p>

          {!isAnalyzing ? (
            <>
              <div className="mb-0 flex">
                <button
                  onClick={() => setActiveTab("paste")}
                  className={`border-brutal border-b-0 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "paste"
                      ? "bg-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <FileText className="mr-2 inline h-4 w-4" />
                  Paste Text
                </button>
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`border-brutal border-b-0 border-l-0 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                    activeTab === "upload"
                      ? "bg-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Upload className="mr-2 inline h-4 w-4" />
                  Upload File
                </button>
              </div>

              <div className="border-brutal p-6">
                {activeTab === "paste" ? (
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your software requirements here..."
                    className="h-64 w-full resize-none border-brutal bg-background p-4 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
                  />
                ) : (
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    className={`flex h-64 flex-col items-center justify-center border-[3px] border-dashed border-foreground transition-colors ${
                      dragOver ? "bg-muted" : "bg-background"
                    }`}
                  >
                    {file ? (
                      <div className="text-center">
                        <FileText className="mx-auto mb-3 h-10 w-10" />
                        <p className="font-mono text-sm font-bold">{file.name}</p>
                        <button
                          onClick={() => setFile(null)}
                          className="mt-2 text-xs font-bold uppercase text-risk-high underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
                        <p className="font-bold uppercase">Drop your file here</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          .PDF, .DOC, .DOCX
                        </p>
                        <label className="mt-4 inline-block cursor-pointer border-brutal bg-primary px-4 py-2 text-sm font-bold uppercase text-primary-foreground shadow-brutal-sm transition-all hover:shadow-brutal-hover hover:translate-x-[2px] hover:translate-y-[2px]">
                          Browse Files
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileInput}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!file}
                className="mt-6 w-full border-brutal-thick bg-primary px-8 py-5 text-lg font-black uppercase tracking-wider text-primary-foreground shadow-brutal transition-all hover:shadow-brutal-hover hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                Analyze Risks
              </button>
            </>
          ) : (
            <div className="border-brutal bg-primary p-6 shadow-brutal">
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary-foreground" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  BuildSafe Terminal
                </span>
              </div>
              <div className="min-h-[300px] font-mono text-sm text-risk-low">
                {terminalLines.map((line, i) => (
                  <div key={i} className="mb-1">
                    {line}
                  </div>
                ))}
                {terminalLines.length < terminalSteps.length && (
                  <span className="animate-terminal-cursor text-primary-foreground">▋</span>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalysisPage;
