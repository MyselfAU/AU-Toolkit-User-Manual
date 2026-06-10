import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (aiClient) return aiClient;
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    // Graceful indicator of missing/default key
    return null;
  }
  aiClient = new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
  return aiClient;
}

// 1. Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    geminiConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY")
  });
});

// 2. Nova Point-of-Contact Analyst endpoint
app.post("/api/nova/query", async (req, res) => {
  const { query, symbol = "BTCUSD" } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Missing 'query' parameter." });
  }

  const ai = getAIClient();

  if (!ai) {
    // Sandbox Mock responses to provide a wonderful interactive fallback
    console.log("No valid GEMINI_API_KEY. Using sandbox mode response.");
    const isCrypto = symbol.toUpperCase().includes("BTC") || symbol.toUpperCase().includes("ETH");
    const val = isCrypto ? 64000 : 180;
    
    // Simulate complex model response schema
    return res.json({
      mode: "sandbox",
      executiveSummary: `Nova Sandbox has completed an off-chain analysis on '${symbol}'. To enable live real-time Gemini generation, please configure your actual GEMINI_API_KEY inside the Secrets panel.`,
      confidenceScore: 88,
      sentimentScore: 0.65,
      riskRating: "MEDIUM",
      rawMarkdown: `### Sandbox Intelligence Report for ${symbol.toUpperCase()}

The autonomous system has processed the raw request: \`"${query}"\`.

#### Technical Signals & Dynamic Metrics
*   **Volatility Index:** Stable range within typical parameters.
*   **Alpha Correlation:** 0.84 to Benchmark assets.
*   **Decentralized Liquidity Matrix:** Highly resilient depth across orderbook levels.

#### Sandbox Optimization Note
The underlying systems of Forge and Nova can perform complex domain-specific financial translations, portfolio optimizations, and synthetic hedge planning when live API keys are connected.
`,
      projectedRevenue: [
        { label: "Q1", value: val * 0.95 },
        { label: "Q2", value: val * 1.02 },
        { label: "Q3", value: val * 1.15 },
        { label: "Q4", value: val * 1.28 }
      ],
      systemInsights: [
        `[INFERENCE] Triggered sandbox analysis for query request: "${query}"`,
        `[SECURE] Mock ingestion complete for node '${symbol.toUpperCase()}'`,
        `[SANDBOX] Success. Add GEMINI_API_KEY for hyper-customized live financial reports.`
      ]
    });
  }

  try {
    const prompt = `Perform a high-fidelity financial analysis representing 'Nova' the autonomous financial analyst.
    User Query: "${query}"
    In-focus ticker/topic: "${symbol}"
    
    Generate output strictly in JSON format matching this schema:
    {
      "executiveSummary": "A concise paragraph summarizing your professional financial outlook, sentiment, and key signals for this query.",
      "confidenceScore": 92, // An integer between 1 and 100 representing confidence in analysis
      "sentimentScore": 0.45, // A float between -1.0 (extremely bearish) and +1.0 (extremely bullish)
      "riskRating": "LOW" | "MEDIUM" | "SUBSTANTIAL" | "CRITICAL",
      "rawMarkdown": "A beautifully drafted, detailed financial analyst report in markdown format. Use subtitles, bullets, and strict financial vocabulary.",
      "projectedRevenue": [
        {"label": "Q1", "value": 120.0},
        {"label": "Q2", "value": 135.0},
        {"label": "Q3", "value": 155.0},
        {"label": "Q4", "value": 180.0}
      ], // Set of 4 data points modeling historical/predicted prices or revenues based on the asset or problem
      "systemInsights": [
        "Inspirational engineering log string 1 (e.g., [PARSER] Loaded SEC Form 10-K...) ",
        "Inspirational engineering log string 2 (e.g., [SENTIMENT] Social NLP vectors resolved)",
        "Inspirational engineering log string 3"
      ] // Include 3 short technical execution steps that make the process feel ultra-premium and live.
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: { type: Type.STRING },
            confidenceScore: { type: Type.INTEGER },
            sentimentScore: { type: Type.NUMBER },
            riskRating: { type: Type.STRING },
            rawMarkdown: { type: Type.STRING },
            projectedRevenue: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                },
                required: ["label", "value"]
              }
            },
            systemInsights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["executiveSummary", "confidenceScore", "sentimentScore", "riskRating", "rawMarkdown", "projectedRevenue", "systemInsights"]
        }
      }
    });

    const jsonStr = response.text || "{}";
    const data = JSON.parse(jsonStr);
    return res.json({ mode: "live", ...data });

  } catch (error: any) {
    console.error("Gemini query failed:", error);
    return res.status(500).json({
      error: "Error querying the financial analysis agent.",
      details: error.message
    });
  }
});

// Vite middleware flow for full stack mounting
async function run() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Financial System Server initiated. Ingress listening on port ${PORT}`);
  });
}

run();
