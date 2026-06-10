import React, { useState, useEffect } from "react";
import { Play, RotateCcw, AlertTriangle, Cpu, Database, Webhook, Zap, ArrowRight, Settings } from "lucide-react";
import { Node } from "../types";

export default function ForgeOrchestrator() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "ingest",
      label: "SEC INGEST MATRIX",
      type: "source",
      status: "idle",
      x: 10,
      y: 120,
      connections: ["gemini_proc"],
      params: {
        sourceType: "SEC Form 10-K / FTP",
        frequency: "Real-time Poll",
        maxBatchSize: 128,
      },
    },
    {
      id: "gemini_proc",
      label: "GEMINI QUANT STRAT",
      type: "transformer",
      status: "idle",
      x: 340,
      y: 60,
      connections: ["alert_sink", "action_sink"],
      params: {
        model: "gemini-3.5-flash",
        temperature: 0.25,
        riskGuardrail: true,
      },
    },
    {
      id: "alert_sink",
      label: "SECURE SLACK WEBHOOK",
      type: "sink",
      status: "idle",
      x: 680,
      y: 20,
      connections: [],
      params: {
        destination: "#financial-alerts",
        triggerConfidence: 85,
      },
    },
    {
      id: "action_sink",
      label: "DMA ALGORITHMIC PORTFOLIO",
      type: "sink",
      status: "idle",
      x: 680,
      y: 200,
      connections: [],
      params: {
        targetBroker: "APEX CLEARING",
        maxExposurePercent: 4.5,
      },
    },
  ]);

  const [activePipeline, setActivePipeline] = useState<boolean>(false);
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [triggerCount, setTriggerCount] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Forge Pipeline Engine instantiated successfully.",
    "[SYS] Standing by. Customize variables and trigger pipeline execution.",
  ]);

  const addLog = (log: string) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${log}`, ...prev.slice(0, 14)]);
  };

  const handleRunPipeline = () => {
    if (activePipeline) return;
    setActivePipeline(true);
    setPipelineStep(1);
    setTriggerCount((c) => c + 1);
    addLog("[ENGINE] Initiating high-frequency strategy audit workflow...");

    // Simulate animated execution through the graph
    // Step 1: Ingest active
    setNodes((prev) =>
      prev.map((n) => (n.id === "ingest" ? { ...n, status: "active" } : { ...n, status: "idle" }))
    );

    // Step 2: Gemini Proc active
    setTimeout(() => {
      setPipelineStep(2);
      addLog("[SEC_INGEST] Successfully scraped and embedded 4 new SEC 10-K raw reports.");
      addLog("[GEMINI_QUANT] Triggering sub-second risk intelligence extraction via 'gemini-3.5-flash'...");
      setNodes((prev) =>
        prev.map((n) =>
          n.id === "gemini_proc" ? { ...n, status: "active" } : n.id === "ingest" ? { ...n, status: "idle" } : n
        )
      );
    }, 1800);

    // Step 3: Sinks active
    setTimeout(() => {
      setPipelineStep(3);
      addLog("[GEMINI_QUANT] Sentiment analysis extracted. Score: +0.72. Confidence: 94.1%. No risk guardrail breaches.");
      addLog("[SLACK_ALERT] Secure message successfully routed to encrypted channel `#financial-alerts`.");
      addLog("[APEX_CLEARING] Automated balancing algorithm satisfied. Target exposure threshold verified.");
      setNodes((prev) =>
        prev.map((n) =>
          n.type === "sink" ? { ...n, status: "active" } : n.id === "gemini_proc" ? { ...n, status: "idle" } : n
        )
      );
    }, 3800);

    // Step 4: Finished
    setTimeout(() => {
      setActivePipeline(false);
      setPipelineStep(0);
      addLog("[ENGINE] Pipeline test deployment query closed. Status code: 200 OK.");
      setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));
    }, 5500);
  };

  const handleReset = () => {
    setActivePipeline(false);
    setPipelineStep(0);
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));
    setLogs([
      "[SYS] Forge Pipeline Engine status recalibrated.",
      "[SYS] Clean state successfully established.",
    ]);
  };

  const updateParam = (nodeId: string, key: string, val: string | number | boolean) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            params: {
              ...n.params,
              [key]: val,
            },
          };
        }
        return n;
      })
    );
    addLog(`[PARAM_UPDATE] Changed '${key}' on node '${nodeId.toUpperCase()}' to: ${val}`);
  };

  return (
    <div className="bg-[#FDFDFD] border border-zinc-100 rounded-3xl p-6 md:p-8 shadow-xs overflow-hidden font-sans">
      
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-50 pb-5 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activePipeline ? "bg-emerald-500" : "bg-zinc-300"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${activePipeline ? "bg-emerald-500" : "bg-zinc-400"}`}></span>
            </span>
            <h3 className="font-sans font-semibold text-lg text-charcoal tracking-tight">
              Forge Orchestrator
            </h3>
          </div>
          <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest font-sans font-medium">
            Active Pipelines: {activePipeline ? "Pipeline Active (Step 1-3)" : "System Standby"}
          </p>
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRunPipeline}
            disabled={activePipeline}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider cursor-pointer border ${
              activePipeline
                ? "bg-zinc-50 text-zinc-400 border-zinc-100 cursor-not-allowed"
                : "bg-black text-white hover:bg-zinc-800 transition-colors border-black shadow-xs"
            }`}
          >
            <Play size={12} className={activePipeline ? "animate-pulse" : ""} />
            RUN PIPELINE LOOP
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider border border-zinc-100 hover:bg-zinc-50 transition-colors text-zinc-500 cursor-pointer"
          >
            <RotateCcw size={12} />
            RESET ORCHESTRATION
          </button>
        </div>
      </div>

      {/* Grid Canvas System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interactive Flow Diagram */}
        <div className="lg:col-span-8 bg-[#FDFDFD] border border-zinc-100 rounded-2xl p-6 relative min-h-[420px] flex flex-col justify-between overflow-x-auto shadow-xs">
          
          {/* Schematic SVG pipeline connections background overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Horizontal pipeline block */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12 py-10 md:px-4">
            
            {/* Step 1: Ingestion Source */}
            <div className={`w-full md:w-[220px] p-5 bg-[#FDFDFD] border rounded-2xl transition-all duration-300 ${
              pipelineStep === 1 
                ? "border-black shadow-sm scale-[1.01]" 
                : "border-zinc-100 shadow-xs"
            }`}>
              <div className="flex items-center gap-2 border-b border-zinc-50 pb-3 mb-4">
                <div className="bg-zinc-50 p-1.5 rounded-full text-zinc-600">
                  <Database size={13} />
                </div>
                <span className="font-sans text-[9px] font-bold text-zinc-400 uppercase tracking-widest">INGEST NODE</span>
              </div>
              <h4 className="font-sans font-semibold text-xs tracking-tight text-charcoal mb-4">
                {nodes[0].label}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-sans font-semibold">Source Feed</label>
                  <select
                    className="w-full mt-1.5 bg-[#FDFDFD] text-charcoal py-1.5 px-2.5 text-[11px] font-sans border border-zinc-150 focus:border-zinc-400 rounded-full focus:outline-none"
                    value={nodes[0].params.sourceType as string}
                    onChange={(e) => updateParam("ingest", "sourceType", e.target.value)}
                  >
                    <option value="SEC Form 10-K / FTP">SEC Form 10-K / FTP</option>
                    <option value="S&P Global API Stream">S&P Global Stream</option>
                    <option value="EDGAR Archive Core">EDGAR Archive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-sans font-semibold">Polling Interval</label>
                  <select
                    className="w-full mt-1.5 bg-[#FDFDFD] text-charcoal py-1.5 px-2.5 text-[11px] font-sans border border-zinc-150 focus:border-zinc-400 rounded-full focus:outline-none"
                    value={nodes[0].params.frequency as string}
                    onChange={(e) => updateParam("ingest", "frequency", e.target.value)}
                  >
                    <option value="Real-time Poll">Real-time (Stream)</option>
                    <option value="Hourly Batch">Hourly Batch</option>
                    <option value="Market Close Delta">Market Close</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3">
                <span className="text-[8px] font-sans text-zinc-400 uppercase tracking-wider font-semibold">STATUS</span>
                <span className={`text-[8px] font-sans font-bold uppercase tracking-widest ${pipelineStep === 1 ? "text-emerald-500 animate-pulse" : "text-zinc-300"}`}>
                  {pipelineStep === 1 ? "POLLING..." : "STANDBY"}
                </span>
              </div>
            </div>

            {/* Link line 1 */}
            <div className="flex md:flex-col items-center justify-center text-zinc-200">
              <ArrowRight className="hidden md:block rotate-0 animate-pulse text-zinc-300" size={16} />
              <ArrowRight className="block md:hidden rotate-90 animate-pulse text-zinc-300" size={16} />
            </div>

            {/* Step 2: Transformer / Gemini Processing */}
            <div className={`w-full md:w-[230px] p-5 bg-[#FDFDFD] border rounded-2xl transition-all duration-300 ${
              pipelineStep === 2 
                ? "border-black shadow-sm scale-[1.01]" 
                : "border-zinc-100 shadow-xs"
            }`}>
              <div className="flex items-center gap-2 border-b border-zinc-50 pb-3 mb-4">
                <div className="bg-zinc-50 p-1.5 rounded-full text-zinc-600">
                  <Cpu size={13} />
                </div>
                <span className="font-sans text-[9px] font-bold text-zinc-400 uppercase tracking-widest">QUANT MODEL</span>
              </div>
              <h4 className="font-sans font-semibold text-xs tracking-tight text-charcoal mb-4">
                {nodes[1].label}
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-sans font-semibold">Processor Base</label>
                  <select
                    className="w-full mt-1.5 bg-[#FDFDFD] text-charcoal py-1.5 px-2.5 text-[11px] font-sans border border-zinc-150 focus:border-zinc-400 rounded-full focus:outline-none"
                    value={nodes[1].params.model as string}
                    onChange={(e) => updateParam("gemini_proc", "model", e.target.value)}
                  >
                    <option value="gemini-3.5-flash">gemini-3.5-flash (Fast)</option>
                    <option value="gemini-3.1-pro-preview">gemini-3.1-pro (Complex)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-[9px] text-zinc-400 uppercase tracking-widest font-sans font-semibold">Temperature</label>
                    <span className="text-[10px] font-sans font-bold text-charcoal">{nodes[1].params.temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    className="w-full mt-2 h-1 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-black animate-none"
                    value={nodes[1].params.temperature as number}
                    onChange={(e) => updateParam("gemini_proc", "temperature", parseFloat(e.target.value))}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="text-[9px] text-zinc-400 uppercase tracking-widest font-sans font-semibold">Confidence filter</label>
                  <input
                    type="checkbox"
                    checked={nodes[1].params.riskGuardrail as boolean}
                    onChange={(e) => updateParam("gemini_proc", "riskGuardrail", e.target.checked)}
                    className="rounded border-zinc-200 text-black focus:ring-black h-4 w-4 cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3">
                <span className="text-[8px] font-sans text-zinc-400 uppercase tracking-wider font-semibold">STATUS</span>
                <span className={`text-[8px] font-sans font-bold uppercase tracking-widest ${pipelineStep === 2 ? "text-amber-500 animate-pulse" : "text-zinc-300"}`}>
                  {pipelineStep === 2 ? "ANALYZING..." : "STANDBY"}
                </span>
              </div>
            </div>

            {/* Link line 2 */}
            <div className="flex md:flex-col items-center justify-center text-zinc-200">
              <ArrowRight className="hidden md:block rotate-0 animate-pulse text-zinc-300" size={16} />
              <ArrowRight className="block md:hidden rotate-90 animate-pulse text-zinc-300" size={16} />
            </div>

            {/* Step 3: Trigger Output Sinks (Stacked for presentation layout) */}
            <div className="flex flex-col gap-4 w-full md:w-[220px]">
              
              {/* Output Sink A */}
              <div className={`p-5 bg-[#FDFDFD] border rounded-2xl transition-all duration-300 ${
                pipelineStep === 3 
                  ? "border-emerald-500 shadow-sm scale-[1.01]" 
                  : "border-zinc-100 shadow-xs opacity-95"
              }`}>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-50">
                  <div className="bg-zinc-50 p-1 rounded-full text-zinc-500">
                    <Webhook size={12} />
                  </div>
                  <span className="font-sans text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">RE-ROUTE ALPHA</span>
                </div>
                <h5 className="font-sans font-semibold text-xs tracking-tight text-charcoal mb-2">
                  {nodes[2].label}
                </h5>
                <div className="space-y-1">
                  <p className="text-[10px] font-sans text-zinc-500 truncate">Ch: {nodes[2].params.destination}</p>
                  <p className="text-[10px] font-sans text-zinc-400 font-light">Score limit: &gt;={nodes[2].params.triggerConfidence}%</p>
                </div>
              </div>

              {/* Output Sink B */}
              <div className={`p-5 bg-[#FDFDFD] border rounded-2xl transition-all duration-300 ${
                pipelineStep === 3 
                  ? "border-emerald-500 shadow-sm scale-[1.01]" 
                  : "border-zinc-100 shadow-xs opacity-95"
              }`}>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-50">
                  <div className="bg-zinc-50 p-1 rounded-full text-zinc-500">
                    <Zap size={12} />
                  </div>
                  <span className="font-sans text-[8.5px] font-bold text-zinc-400 uppercase tracking-widest">ORDER EXECUTION</span>
                </div>
                <h5 className="font-sans font-semibold text-xs tracking-tight text-charcoal mb-2">
                  {nodes[3].label}
                </h5>
                <div className="space-y-1">
                  <p className="text-[10px] font-sans text-zinc-500 truncate">Broker: {nodes[3].params.targetBroker}</p>
                  <p className="text-[10px] font-sans text-zinc-400 font-light">Threshold limit: {nodes[3].params.maxExposurePercent}%</p>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive visual pipeline pulse path slider indicator */}
          <div className="mt-4 pt-4 border-t border-zinc-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[11px] font-sans text-zinc-400 font-light text-center sm:text-left">
              Direct pipeline simulation logic managed using React declarative status indicators.
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-sans font-semibold text-zinc-400 uppercase tracking-widest">DATAFLOW LOAD:</span>
              <div className="w-24 bg-zinc-100 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-black h-full transition-all duration-500"
                  style={{ width: `${pipelineStep === 1 ? 33 : pipelineStep === 2 ? 66 : pipelineStep === 3 ? 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        {/* Console Execution Status Logs */}
        <div className="lg:col-span-4 bg-[#1A1A1A] border border-zinc-800 text-zinc-300 rounded-2xl p-5 md:p-6 flex flex-col justify-between font-sans shadow-md">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">SYSTEM DIAGNOSTICS</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-semibold tracking-wider font-mono">LOOP_ID_74P</span>
            </div>

            <div className="space-y-3 font-mono text-[10px] max-h-[290px] overflow-y-auto leading-relaxed antialiased">
              {logs.map((log, index) => {
                const isSys = log.includes("[SYS]");
                const isErr = log.includes("[ERR]");
                const isUpdate = log.includes("[PARAM_UPDATE]");
                
                let textColor = "text-zinc-400";
                if (isSys) textColor = "text-sky-400/90";
                else if (isErr) textColor = "text-rose-400";
                else if (isUpdate) textColor = "text-amber-400/95";
                
                return (
                  <div key={index} className="border-l border-zinc-800 pl-2.5 transition-all duration-300">
                    <span className={textColor}>{log}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 mt-4 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-sans text-zinc-400">
              <span>Environment:</span>
              <span className="text-emerald-500 font-semibold">Vite Production</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-sans text-zinc-400">
              <span>Deployments:</span>
              <span className="text-zinc-200 font-semibold">{triggerCount} Runs initiated</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
