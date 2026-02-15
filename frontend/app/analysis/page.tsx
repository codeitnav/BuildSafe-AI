"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, AlertTriangle, CheckSquare, Loader2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const SystemLoader = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const steps = [
    "INITIALIZING_RUNTIME_ENV",
    "LOADING_HEURISTIC_MODELS",
    "PARSING_AST_TREE",
    "TOKENIZING_INPUT_STREAM",
    "DETECTING_AMBIGUITY_PATTERNS",
    "CHECKING_OWASP_COMPLIANCE",
    "ANALYZING_RISK_VECTORS",
    "COMPILING_FINAL_REPORT",
  ];

  useEffect(() => {
    let stepIndex = 0;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 2; 
      });
    }, 200);

    const logInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setLogs((prev) => [`> ${steps[stepIndex]}... [OK]`, ...prev]);
        stepIndex++;
      }
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="w-full border-brutal-thick bg-white p-0 shadow-brutal transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b-[3px] border-black bg-black p-3 text-white">
        <div className="flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="font-mono text-sm font-bold uppercase tracking-wider">
            SYSTEM_ANALYSIS.EXE
          </span>
        </div>
        <span className="font-mono text-xs font-bold bg-white text-black px-2 py-0.5">
          PID: {Math.floor(Math.random() * 9000) + 1000}
        </span>
      </div>

      <div className="flex flex-col md:flex-row h-64">
        
        <div className="flex flex-1 flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-black p-8 bg-[hsl(var(--background))]">
          <h3 className="mb-2 font-mono text-xs font-bold uppercase text-muted-foreground">
            Total Progress
          </h3>
          <div className="text-6xl font-black tracking-tighter text-black">
            {progress}%
          </div>
          
          <div className="mt-6 h-6 w-full border-[3px] border-black p-[2px]">
            <div 
              className="h-full bg-black transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-xs font-bold uppercase animate-pulse">
            {progress < 100 ? "Processing Data Chunks..." : "Finalizing..."}
          </p>
        </div>

        <div className="flex-1 overflow-hidden bg-white p-6 relative">
          <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-[10px] font-bold font-mono">
            LOG_STREAM
          </div>
          <div className="font-mono text-sm space-y-2 h-full flex flex-col justify-end">
             <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent pointer-events-none" />
             
             {logs.slice(0, 6).map((log, i) => (
               <div key={i} className="flex items-center gap-2 text-black">
                 <CheckSquare className="h-3 w-3 flex-shrink-0" />
                 <span className="truncate">{log}</span>
               </div>
             ))}
             {progress < 100 && (
                <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                  <span className="h-3 w-3 bg-black block" />
                  <span>_</span>
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  
  const [uiState, setUiState] = useState<"idle" | "loading">("idle");
  const [dragOver, setDragOver] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorData, setErrorData] = useState<{
    message: string;
    example: string[];
  } | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!file && !text) return;

    try {
      setUiState("loading");

      const ownerId = getOrCreateAnonymousId();
      const formData = new FormData();
      formData.append("ownerType", "anonymous");
      formData.append("ownerId", ownerId);

      if (activeTab === "upload" && file) formData.append("file", file);
      if (activeTab === "paste" && text) formData.append("text", text);

      const response = await fetch(`${API_BASE_URL}/api/extract`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.mode === "IDEA_LEVEL_INPUT") {
        setErrorData({
          message: `Right now we detected ${data.detectedCount} structured requirement${data.detectedCount === 1 ? "" : "s"}.`,
          example: data.suggestion
            .split("\n")
            .map((line: string) => line.trim())
            .filter((line: string) => line.length > 0)
        });
        setShowErrorModal(true);
        setUiState("idle"); 
        return;
      }

      if (!data.success) {
        throw new Error(data.message || "Analysis failed");
      }

      router.push(`/analysis/${data.analysisId}`);

    } catch (error) {
      console.error("Analysis error:", error);
      setUiState("idle");
      alert("Something went wrong with the analysis. Please try again.");
    }
  }, [file, text, activeTab, router]);

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

          {uiState === "idle" && (
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

              <div className="border-brutal p-6 transition-all">
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
                disabled={!file && !text}
                className="mt-6 w-full border-brutal-thick bg-primary px-8 py-5 text-lg font-black uppercase tracking-wider text-primary-foreground shadow-brutal transition-all hover:shadow-brutal-hover hover:translate-x-[4px] hover:translate-y-[4px] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-brutal disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                Analyze Risks
              </button>
            </>
          )}

          {uiState === "loading" && <SystemLoader />}

          {showErrorModal && errorData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setShowErrorModal(false)}>
              <div className="w-[90%] max-w-2xl border-brutal-thick bg-[hsl(var(--background))] p-8 shadow-[8px_8px_0px_#000]" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4 text-black">
                    <AlertTriangle className="h-8 w-8 stroke-[3]" />
                    <h2 className="text-xl font-black uppercase tracking-wide">
                        Input Refinement Needed
                    </h2>
                </div>

                <p className="mb-4 text-sm font-medium leading-relaxed">
                  {errorData.message}
                </p>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  To properly analyze risks, we need more context:
                </p>

                <ul className="mb-6 list-disc space-y-1 pl-5 text-sm font-medium">
                  <li>What users can do</li>
                  <li>Approximate user scale</li>
                  <li>Security requirements</li>
                </ul>

                <div className="border-brutal bg-white p-4 mb-6">
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Suggested Structured Version
                  </p>
                  <ul className="space-y-2 font-mono text-sm">
                    {errorData.example.map((line, i) => (
                      <li key={i} className="border-l-[3px] border-black pl-3 text-gray-700">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => {
                    const structuredText = errorData.example.join("\n");
                    setText(structuredText);
                    setActiveTab("paste");
                    setFile(null);
                    setShowErrorModal(false);
                  }}
                  className="w-full border-brutal bg-black px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-brutal transition-all hover:bg-gray-800 hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  Use This Structure
                </button>
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