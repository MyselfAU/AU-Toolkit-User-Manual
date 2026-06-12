import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InstallationSection } from "./components/InstallationSection";
import { EffectsSection } from "./components/EffectsSection";
import { ExpressionsSection } from "./components/ExpressionsSection";
import { MoreToolsSection } from "./components/MoreToolsSection";
import { ScriptsSection } from "./components/ScriptsSection";
import { LauncherSection } from "./components/LauncherSection";
import { QuickRefSection } from "./components/QuickRefSection";
import { HeroCanvas } from "./components/HeroCanvas";
import { CustomCursor } from "./components/CustomCursor";
import { FooterName } from "./components/FooterName";
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Layers, 
  Sparkles, 
  Sliders, 
  Terminal, 
  Cpu, 
  ChevronRight, 
  Search, 
  Copy, 
  Play, 
  RotateCcw, 
  Webhook, 
  Zap, 
  Folder, 
  FileText, 
  Plus, 
  Trash, 
  Undo, 
  Download, 
  Upload, 
  HelpCircle,
  Monitor,
  Menu,
  X,
  Code,
  Sun,
  Moon
} from "lucide-react";

// Types
interface ToolItem {
  id: string;
  name: string;
  tab: "effects" | "expressions" | "more" | "scripts" | "launcher" | "installation";
  desc: string;
  howTo: string[];
  type: "Button" | "Expression" | "Scanner" | "Library";
  hasSettings?: boolean;
}

const TOOLS_DATA: ToolItem[] = [
  {
    id: "ramp-gradient",
    name: "Ramp Gradient",
    tab: "effects",
    type: "Button",
    desc: "Applies a 2-color gradient (top to bottom) using After Effects' native Ramp effect. Expression-linked so it automatically fills the layer perfectly even when moved or resized.",
    howTo: [
      "Select a layer in your composition.",
      "Click Ramp Gradient button in the panel.",
      "Open the native Effects Control panel to customize the two gradient colors."
    ]
  },
  {
    id: "four-color-gradient",
    name: "4-Color Gradient",
    tab: "effects",
    type: "Button",
    desc: "Applies a 4-color gradient effect mapping one custom color to each corner. Intelligent backing expressions keep the gradient points fitted to the layer boundaries at all times.",
    howTo: [
      "Select a layer in your timeline.",
      "Click 4-Color Gradient.",
      "In the Effects Controls panel, customize the corner colors (Point 1–4)."
    ]
  },
  {
    id: "randomize-colors",
    name: "Randomize Colors",
    tab: "effects",
    type: "Button",
    desc: "Sets all color parameters of the applied gradient effect to randomized coordinates and hexadecimal colors instantly. Perfect for rapid look exploration.",
    howTo: [
      "Apply either a Ramp or a 4-Color gradient effect to a layer first.",
      "Ensure the layer is selected.",
      "Click Randomize Colors repeatedly to cycle through unique variations."
    ]
  },
  {
    id: "animate-colors",
    name: "Animate Colors",
    tab: "effects",
    type: "Button",
    hasSettings: true,
    desc: "Creates smooth color transitions from current colors to new randomized hex palettes over a duration you specify. Keyframes are added to the timeline automatically.",
    howTo: [
      "Select a layer with a gradient applied.",
      "Type a numeric duration (e.g. 2 for 2 seconds) into the input parameter field.",
      "Shift the timeline playhead to your starting frame.",
      "Click Animate Colors."
    ]
  },
  {
    id: "cc-light-sweep",
    name: "CC Light Sweep",
    tab: "effects",
    type: "Button",
    desc: "Applies a modern, light shine reflex sweep across your layer. The center of the sweep is anchored with mathematical bounds so it stays focused on layer coordinates.",
    howTo: [
      "Select any solid, asset, or precomposition.",
      "Click CC Light Sweep.",
      "Animate the Direction parameter within After Effects to shift the shine."
    ]
  },
  {
    id: "grab-effects",
    name: "Grab Effects",
    tab: "effects",
    type: "Button",
    desc: "Copies all active effects on the selected layer into memory using After Effects' clipboard buffer. Displays status messages verifying copied counts.",
    howTo: [
      "Select the master layer containing the customized effects stack.",
      "Click Grab Effects."
    ]
  },
  {
    id: "apply-effects",
    name: "Apply Effects",
    tab: "effects",
    type: "Button",
    desc: "Applies grabbed effects in memory to multiple selected target layers instantly in a single batch script execution.",
    howTo: [
      "First click Grab Effects on your source layer.",
      "Select one or more destination target layers (hold Shift or Ctrl).",
      "Click Apply Effects to duplicate the stack."
    ]
  },
  {
    id: "attach-null-to-trim",
    name: "Attach Null to Trim End",
    tab: "effects",
    type: "Button",
    hasSettings: true,
    desc: "Creates a newly designated tracker Null layer following the trailing vertex coordinate of a Trim Paths animation sequence. Perfect for attaching design assets, flares, or text overlays to write-on lines.",
    howTo: [
      "Create a Vector Shape Layer containing a path and a Trim Paths stroke modifier.",
      "Select that shape layer.",
      "Toggle the 'Rotation Tracking' parameter if you want the Null to follow tangent curves.",
      "Click Attach Null to Trim End to bind a new null follower."
    ]
  },
  {
    id: "overshoot-bounce",
    name: "Overshoot / Bounce",
    tab: "expressions",
    type: "Expression",
    hasSettings: true,
    desc: "Injects a physics-accurate spring overshoot mechanism triggering settled bounces automatically when an animation reach a linear keyframe value.",
    howTo: [
      "Animate any value (Scale, Position, Rotation) with at least two keyframes.",
      "Select the specific property name in the timeline.",
      "Click Overshoot / Bounce. Modify frequency and decay sliders in Effects."
    ]
  },
  {
    id: "flicker",
    name: "Flicker",
    tab: "expressions",
    type: "Expression",
    hasSettings: true,
    desc: "Injects random frequency noise into the opacity transform parameter of a layer, creating high fidelity flashing effects akin to analog broken lights.",
    howTo: [
      "Select any timeline layer.",
      "Adjust the Frequency, Min Opacity, and Max Opacity parameters under input.",
      "Click the Flicker script button."
    ]
  },
  {
    id: "wiggle",
    name: "Wiggle",
    tab: "expressions",
    type: "Expression",
    hasSettings: true,
    desc: "Injects continuous organic fractal noise based on specified Frequency (wiggle rate per second) and Amplitude (motion amplitude bounds) nodes.",
    howTo: [
      "Select a property track inside the timeline (such as Position).",
      "Assign rate and boundaries in the control panel.",
      "Click Wiggle to auto-apply the expression rigged with custom Sliders."
    ]
  },
  {
    id: "loop-cycle",
    name: "Loop Cycle",
    tab: "expressions",
    type: "Expression",
    desc: "Applies loopOut('cycle') to trace and repeat keyframe motion forever. Simplifies design loops.",
    howTo: [
      "Add two or more keyframes on a property.",
      "Select the active property track in the timeline.",
      "Click Loop Cycle."
    ]
  },
  {
    id: "loop-ping-pong",
    name: "Loop Ping-Pong",
    tab: "expressions",
    type: "Expression",
    desc: "Applies loopOut('pingpong') to repeat values in reverse back-and-forth oscillations — useful for perpetual swings or slides.",
    howTo: [
      "Create at least two keys on your property.",
      "Select the property track.",
      "Click Loop Ping-Pong."
    ]
  },
  {
    id: "stagger",
    name: "Stagger Layers",
    tab: "more",
    type: "Button",
    hasSettings: true,
    desc: "Re-aligns selected layers across time with custom frame offset intervals, allowing fast sequence staggering in either direction.",
    howTo: [
      "Select at least two layers in the layout.",
      "Specify frame offsets (e.g., 5 frames) and order direction (Top-to-Bottom / Bottom-to-Top).",
      "Click Stagger Layers."
    ]
  },
  {
    id: "organize",
    name: "Organize Project",
    tab: "more",
    type: "Button",
    desc: "Instantly audits, categorizes, and organizes mess project panels into tidy semantic folder structures. Sorts video assets, audio clips, image sequences, vector paths, and pre-comps.",
    howTo: [
      "With active assets in your After Effects project, click Organize Project.",
      "Use 'Undo Organize' if you need to reverse item changes instantly."
    ]
  },
  {
    id: "srt-import",
    name: "Import SRT (Subtitles)",
    tab: "more",
    type: "Button",
    desc: "Parses standardized subtitle text files (.SRT), creating fully synchronized timestamped text layers with accurate timeline in/out properties automatically.",
    howTo: [
      "Open your active composition.",
      "Click Import SRT (Subtitles).",
      "Select your local SRT file from the dialog and let the script generate styled text plates."
    ]
  },
  {
    id: "srt-editor",
    name: "SRT Editor",
    tab: "more",
    type: "Button",
    desc: "Opens a dedicated interactive text block inside the ScriptUI panel space to edit timestamps and dialog lines without leaving Adobe After Effects.",
    howTo: [
      "Click SRT Editor.",
      "Change subtitles in the side pane, then click Sync Subtitles."
    ]
  },
  {
    id: "code-runner",
    name: "Code Runner Toolbar",
    tab: "scripts",
    type: "Library",
    desc: "A custom user folder database to save reusable code scripts, expressions, or presets as dynamic buttons. Rearrange, change folder colors, export settings, and run presets with single clicks.",
    howTo: [
      "Right-click on script folders to generate a new run button.",
      "Write or import ExtendScript code, assign and label the shortcut.",
      "Hold Alt and click any shortcut to edit code properties instantly with ease."
    ]
  },
  {
    id: "launcher",
    name: "Script Launcher",
    tab: "launcher",
    type: "Scanner",
    desc: "Intelligently scans system folders for .jsx and .jsxbin scripts, updating a search list for double click executions.",
    howTo: [
      "Launch files by double clicking their name in the scanner list.",
      "Use the search bar to locate specific tool scripts dynamically.",
      "Add custom directories if utilizing cloud-synced files."
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"installation" | "effects" | "expressions" | "more" | "scripts" | "launcher" | "quickref">("installation");
  const [searchTerm, setSearchTerm] = useState("");
  const [utcTime, setUtcTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Custom script run status messaging
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Time-ticking UTC Clock in mono
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toLocaleString("en-US", { timeZone: "UTC", hour12: false }) + " UTC");
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-Spy IntersectionObserver to keep activeTab state matched to currently scrolled section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "installation") {
            setActiveTab("installation");
          } else if (id === "section-1") {
            setActiveTab("effects");
          } else if (id === "section-2") {
            setActiveTab("expressions");
          } else if (id === "section-3") {
            setActiveTab("more");
          } else if (id === "section-4") {
            setActiveTab("scripts");
          } else if (id === "section-5") {
            setActiveTab("launcher");
          } else if (id === "quickref") {
            setActiveTab("quickref");
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = [
      "installation",
      "section-1",
      "section-2",
      "section-3",
      "section-4",
      "section-5",
      "quickref"
    ];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Universal search functionality
  const filteredTools = TOOLS_DATA.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.tab.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Focus specific tool detail card
  const handleLinkToTool = (tab: any, toolId: string) => {
    setActiveTab(tab);
    setSearchTerm("");
    setTimeout(() => {
      const element = document.getElementById(toolId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.classList.add("ring-2", "ring-black", "duration-1000");
        setTimeout(() => {
          element.classList.remove("ring-2", "ring-black");
        }, 2000);
      }
    }, 100);
  };

  const handleNavClick = (tabName: "installation" | "effects" | "expressions" | "more" | "scripts" | "launcher" | "quickref", elementId: string) => {
    setActiveTab(tabName);
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyToClipboard = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const hexToRgbNormalized = (hex: string): number[] => {
    const raw = hex.replace("#", "");
    const r = parseInt(raw.substring(0, 2), 16) / 255;
    const g = parseInt(raw.substring(2, 4), 16) / 255;
    const b = parseInt(raw.substring(4, 6), 16) / 255;
    return [parseFloat(r.toFixed(3)), parseFloat(g.toFixed(3)), parseFloat(b.toFixed(3))];
  };

  const handleGenerateCode = (toolId: string, category: string) => {
    let codePayload = "";
    if (category === "effects") {
      if (gradientType === "ramp") {
        codePayload = `// Apply Expression-Linked 2-Color Ramp Gradient
var activeLayer = app.project.activeItem.selectedLayers[0];
if (activeLayer) {
  var ramp = activeLayer.Effects.addProperty("ADBE Ramp");
  ramp.property("Start of Ramp").expression = "[thisLayer.width / 2, 0]";
  ramp.property("End of Ramp").expression = "[thisLayer.width / 2, thisLayer.height]";
  ramp.property("Start Color").setValue([${hexToRgbNormalized(gradientColors[0]).join(", ")}]);
  ramp.property("End Color").setValue([${hexToRgbNormalized(gradientColors[1]).join(", ")}]);
  ${ccLightSweepActive ? `
  var sweep = activeLayer.Effects.addProperty("CC Light Sweep");
  sweep.property("Center").expression = "[thisLayer.width / 2, thisLayer.height / 2]";
  sweep.property("Direction").setValue(-45);` : ''}
}`;
      } else {
        codePayload = `// Apply Expression-Linked 4-Color Gradient
var activeLayer = app.project.activeItem.selectedLayers[0];
if (activeLayer) {
  var grad = activeLayer.Effects.addProperty("ADBE 4ColorGradient");
  grad.property("Point 1").expression = "[0, 0]";
  grad.property("Point 2").expression = "[thisLayer.width, 0]";
  grad.property("Point 3").expression = "[0, thisLayer.height]";
  grad.property("Point 4").expression = "[thisLayer.width, thisLayer.height]";
  grad.property("Color 1").setValue([${hexToRgbNormalized(gradientColors[0]).join(", ")}]);
  grad.property("Color 2").setValue([${hexToRgbNormalized(gradientColors[1]).join(", ")}]);
  grad.property("Color 3").setValue([${hexToRgbNormalized(gradientColors[2]).join(", ")}]);
  grad.property("Color 4").setValue([${hexToRgbNormalized(gradientColors[3]).join(", ")}]);
}`;
      }
    } else if (category === "expressions") {
      codePayload = activeExpSim === "bounce" ? getBounceCode() : activeExpSim === "flicker" ? getFlickerCode() : getWiggleCode();
    } else if (category === "more") {
      if (toolId.includes("Subtitle") || toolId.includes("Subtitle_Import")) {
        codePayload = `// Create SRT Subtitle Layers
var comp = app.project.activeItem;
if (comp) {
  app.beginUndoGroup("Import SRT Subtitles");
  var subs = ${JSON.stringify(parsedSubtitles, null, 2)};
  for (var i = 0; i < subs.length; i++) {
    var sub = subs[i];
    var textLayer = comp.layers.addText(sub.text);
    textLayer.name = "SUB_" + sub.id;
    
    // Set In and Out points
    textLayer.inPoint = parseSrtTime(sub.start);
    textLayer.outPoint = parseSrtTime(sub.end);
  }
  app.endUndoGroup();
}

function parseSrtTime(timeStr) {
  var parts = timeStr.split(":");
  var hrs = parseFloat(parts[0]);
  var mins = parseFloat(parts[1]);
  var secsParts = parts[2].split(",");
  var secs = parseFloat(secsParts[0]);
  var ms = parseFloat(secsParts[1]) / 1000;
  return (hrs * 3600) + (mins * 60) + secs + ms;
}`;
      } else {
        codePayload = `// Auto-Organize After Effects Project Tree
app.beginUndoGroup("Organize Assets");
var items = app.project.items;
var folders = {};
var folderNames = ["_Footage", "_Audio", "_Compositions", "_Assets"];

for (var i = 0; i < folderNames.length; i++) {
  var found = false;
  for (var j = 1; j <= items.length; j++) {
    if (items[j] instanceof FolderItem && items[j].name === folderNames[i]) {
      folders[folderNames[i]] = items[j];
      found = true;
      break;
    }
  }
  if (!found) {
    folders[folderNames[i]] = app.project.items.addFolder(folderNames[i]);
  }
}

for (var k = 1; k <= items.length; k++) {
  var item = items[k];
  if (item.parentFolder.name === "Root") {
    if (item instanceof CompItem) {
      item.parentFolder = folders["_Compositions"];
    } else if (item instanceof FootageItem) {
      if (item.file && item.file.name.match(/\\.(wav|mp3|aif)$/i)) {
        item.parentFolder = folders["_Audio"];
      } else {
        item.parentFolder = folders["_Footage"];
      }
    }
  }
}
app.endUndoGroup();`;
      }
    } else if (category === "scripts") {
      codePayload = `// Create Dockable ScriptUI Shortcut Button
(function(thisObj) {
  function buildUI(container) {
    var myPanel = (container instanceof Panel) ? container : new Window("palette", "AU Shortcuts Panel", undefined, {resizeable: true});
    var btn = myPanel.add("button", undefined, "Execute Shortcut");
    btn.onClick = function() {
      alert("Shortcut triggered! Running Extendscript pipeline...");
    };
    myPanel.layout.layout(true);
    return myPanel;
  }
  buildUI(thisObj);
})(this);`;
    } else if (category === "launcher") {
      codePayload = `// Scan and index jsx script folder files
var scriptsFolder = Folder(Folder.startup.fullName + "/Support Files/Scripts");
var jsxFiles = scriptsFolder.getFiles("*.jsx");
var outputStr = "Indexed JSX Files:\\n";
for (var i = 0; i < jsxFiles.length; i++) {
  outputStr += jsxFiles[i].displayName + " (" + Math.round(jsxFiles[i].length / 1024) + " KB)\\n";
}
alert(outputStr);`;
    }

    navigator.clipboard.writeText(codePayload);
    setRunnerLogs(prev => [
      `[SUCCESS] Generated custom clean script payload.`,
      `[SUCCESS] ${toolId} code copied to system clipboard!`,
      ...prev
    ]);
  };

  // --- INTERACTIVE PLAYGROUND CORES ---

  // 1. Effects Tab Gradient Simulator state
  const [gradientType, setGradientType] = useState<"ramp" | "fourColor">("ramp");
  const [gradientColors, setGradientColors] = useState<string[]>(["#D4B87E", "#5A7FA8", "#5C9E8A", "#C06060"]);
  const [ccLightSweepActive, setCcLightSweepActive] = useState(false);
  const [rotationActive, setRotationActive] = useState(false);
  const [animationDuration, setAnimationDuration] = useState("2.0");
  const [isAnimatingColors, setIsAnimatingColors] = useState(false);

  const handleRandomizeColors = () => {
    const hexChars = "0123456789ABCDEF";
    const getRandomColor = () => {
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    setGradientColors([getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor()]);
  };

  const handleAnimateColors = () => {
    setIsAnimatingColors(true);
    let timer = parseFloat(animationDuration) * 1000;
    setTimeout(() => {
      handleRandomizeColors();
      setIsAnimatingColors(false);
    }, timer);
  };

  // 2. Expressions Tab Spring / Bounce Simulator state
  const [activeExpSim, setActiveExpSim] = useState<"bounce" | "flicker" | "wiggle">("bounce");
  const [bounceFreq, setBounceFreq] = useState(3);
  const [bounceAmp, setBounceAmp] = useState(40);
  const [bounceDecay, setBounceDecay] = useState(5);
  const [flickerFreq, setFlickerFreq] = useState(8);
  const [flickerMin, setFlickerMin] = useState(15);
  const [flickerMax, setFlickerMax] = useState(100);
  const [wiggleFreq, setWiggleFreq] = useState(6);
  const [wiggleAmp, setWiggleAmp] = useState(25);

  const [wiggleOffset, setWiggleOffset] = useState({ x: 0, y: 0 });
  const [flickerOpacity, setFlickerOpacity] = useState(100);
  const [isBouncing, setIsBouncing] = useState(false);

  // Expression Code Generators
  const getBounceCode = () => `// Overshoot Bounce Applied
freq = ${bounceFreq};
amp = ${bounceAmp} / 100;
decay = ${bounceDecay};

n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time){ n--; }
}
if (n == 0){ t = 0; } else { t = time - key(n).time; }

if (n > 0 && t < 1){
  v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
  value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
} else {
  value;
}`;

  const getFlickerCode = () => `// Opacity Flicker Applied
freq = ${flickerFreq};
minVal = ${flickerMin};
maxVal = ${flickerMax};

seedRandom(index, false);
random(minVal, maxVal) * (Math.sin(time * freq * Math.PI * 2) + 1) / 2;`;

  const getWiggleCode = () => `// Slider Rigged Wiggle Applied
freq = ${wiggleFreq};
amp = ${wiggleAmp};
wiggle(freq, amp);`;

  // Expressions Live Preview Engine
  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.05;
      if (activeExpSim === "wiggle") {
        const offsetVal = Math.sin(t * wiggleFreq) * wiggleAmp;
        setWiggleOffset({
          x: offsetVal * Math.cos(t * 0.5),
          y: offsetVal * Math.sin(t * 0.5)
        });
        setFlickerOpacity(100);
      } else if (activeExpSim === "flicker") {
        const noise = (Math.sin(t * flickerFreq * 3) + 1) / 2;
        const opRange = flickerMax - flickerMin;
        setFlickerOpacity(flickerMin + noise * opRange);
        setWiggleOffset({ x: 0, y: 0 });
      } else {
        setWiggleOffset({ x: 0, y: 0 });
        setFlickerOpacity(100);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [activeExpSim, wiggleFreq, wiggleAmp, flickerFreq, flickerMin, flickerMax]);

  const triggerBounceDemo = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1200);
  };


  // 3. More Tools Tab Project Organizer Simulator
  const [projectFiles, setProjectFiles] = useState([
    { name: "interview_bloopers.wav", type: "Audio", location: "Root" },
    { name: "epic_sunset_render.mp4", type: "Video", location: "Root" },
    { name: "lower_third_precomp", type: "Pre-comp", location: "Root" },
    { name: "au_logo_vector.ai", type: "Vector", location: "Root" },
    { name: "grunge_concrete_texture.jpg", type: "Image", location: "Root" },
    { name: "scene_02_shot_04.mov", type: "Video", location: "Root" },
  ]);
  const [originalFiles] = useState([...projectFiles]);
  const [isOrganized, setIsOrganized] = useState(false);

  const handleOrganizeProject = () => {
    const organized = projectFiles.map(file => {
      let folder = "Other";
      if (file.type === "Audio") folder = "Audio Files";
      else if (file.type === "Video") folder = "Video Files";
      else if (file.type === "Pre-comp") folder = "Pre-comps";
      else if (file.type === "Vector") folder = "Vector Files";
      else if (file.type === "Image") folder = "Images";
      return { ...file, location: folder };
    });
    setProjectFiles(organized);
    setIsOrganized(true);
  };

  const handleUndoOrganize = () => {
    setProjectFiles(originalFiles.map(f => ({ ...f, location: "Root" })));
    setIsOrganized(false);
  };

  // SRT subtitle editor/builder simulator
  const [srtInput, setSrtInput] = useState(`1
00:00:01,000 --> 00:00:03,500
Welcome to the AU Toolkit Manual!

2
00:00:04,100 --> 00:00:07,800
A dockable script framework designed for high-end results.`);

  const [parsedSubtitles, setParsedSubtitles] = useState<{ id: number; start: string; end: string; text: string }[]>([]);

  useEffect(() => {
    const blocks = srtInput.trim().split(/\n\s*\n/);
    const parsed = blocks.map(block => {
      const lines = block.split("\n");
      if (lines.length >= 3) {
        const id = parseInt(lines[0]);
        const times = lines[1].split(" --> ");
        const text = lines.slice(2).join(" ");
        return { id, start: times[0] || "", end: times[1] || "", text };
      }
      return null;
    }).filter(b => b !== null) as any[];
    setParsedSubtitles(parsed);
  }, [srtInput]);


  // 4. Scripts Tab: Simulated Code Runner setup
  const [runnerButtons, setRunnerButtons] = useState([
    { name: "Apply Soft Grain", type: "Script", folder: "Utility", code: `var comp = app.project.activeItem;\nif (comp) {\n  var layer = comp.layers.addSolid([0.1,0.1,0.1], "Noise Grain", comp.width, comp.height, 1.0);\n  layer.effects.addProperty("Add Grain");\n  layer.opacity.setValue(12);\n}` },
    { name: "Perpetual Spin", type: "Expression", folder: "Motion", code: `time * 120; // Fast perpetual rotation script` },
    { name: "3D Camera Rig", type: "Script", folder: "Rigging", code: `var comp = app.project.activeItem;\nif (comp) {\n  var cam = comp.layers.addCamera("Master Cam", [comp.width/2, comp.height/2]);\n  var nullCtrl = comp.layers.addNull();\n  nullCtrl.name = "Cam Null Controller";\n  nullCtrl.threeDLayer = true;\n  cam.parent = nullCtrl;\n}` },
  ]);

  const [runnerLogs, setRunnerLogs] = useState<string[]>([
    "[SYS] Code Runner Toolbar system online.",
    "[SYS] Standing by. Select folder buttons to initiate mock script triggers."
  ]);
  const [newButtonName, setNewButtonName] = useState("");
  const [newButtonType, setNewButtonType] = useState<"Script" | "Expression">("Script");
  const [newButtonFolder, setNewButtonFolder] = useState("Utility");
  const [newButtonCode, setNewButtonCode] = useState("alert('Simulated Toolkit script applied!');");
  const [showAddModal, setShowAddModal] = useState(false);

  const runCodeSim = (name: string, type: string, code: string) => {
    setRunnerLogs(prev => [
      `[EXEC] Initiating shortcut link: "${name}" [${type}]`,
      `[SYS] Parsed Extendscript instructions...`,
      type === "Script" ? `[RUN] app.beginUndoGroup("Run Script ${name}")` : `[COMP] Rigging target expressions...`,
      `[SUCCESS] Hook established cleanly inside active comp!`,
      ...prev
    ]);
  };

  const handleCreateButton = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newButtonName) return;
    setRunnerButtons(prev => [
      ...prev,
      { name: newButtonName, type: newButtonType, folder: newButtonFolder, code: newButtonCode }
    ]);
    runCodeSim(newButtonName, newButtonType, newButtonCode);
    setNewButtonName("");
    setNewButtonCode("alert('Simulated Toolkit script applied!');");
    setShowAddModal(false);
  };


  // 5. Launcher Tab: Simulated jsx directories scanner
  const [launchQuery, setLaunchQuery] = useState("");
  const [launchFiles, setLaunchFiles] = useState([
    { name: "AutoCrop_Layers.jsx", path: "/Scripts/ScriptUI Panels", size: "38kb", date: "2026-04-12" },
    { name: "Color_Palettes_Scribe.jsx", path: "/Scripts/ScriptUI Panels", size: "124kb", date: "2026-05-18" },
    { name: "Ease_and_Wizz_Pro.jsxbin", path: "/Scripts/ScriptUI Panels", size: "290kb", date: "2026-01-20" },
    { name: "Move_Anchor_Points.jsx", path: "/Scripts", size: "15kb", date: "2026-06-02" },
    { name: "Slicy_Splines_Fast.jsx", path: "/Scripts", size: "82kb", date: "2026-05-30" },
  ]);

  const scannedFiles = launchFiles.filter(f => 
    f.name.toLowerCase().includes(launchQuery.toLowerCase())
  );

  const handleSimulateLaunch = (filename: string) => {
    alert(`⚡ Simulated launch of: ${filename}\n\nThis imitates the After Effects internal scanner action. The script compiles via JSX Engine and generates its dockable frame context.`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-theme' : ''} bg-[#e8e2da] text-[#1A1A1A] flex flex-col justify-between selection:bg-black selection:text-white transition-colors duration-200`}>
      
      {/* NOISE OVERLAY FOR PREMIUM PAPER TEXTURE */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.7] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj4NCiAgPGZpbHRlciBpZD0ibm9pc2UiPgorICAgPGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNiIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPg0KICA8L2ZpbHRlcj4NCiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIgbWl4LWJsZW5kLW1vZGU9Im92ZXJsYXkiLz4NCjwvc3ZnPg==')] mix-blend-overlay"></div>
      
      <CustomCursor />
      
      {/* HEADER SECTION */}
      <header className="border-b border-zinc-200/65 sticky top-0 bg-[#e8e2da]/90 backdrop-blur-md z-40">
        <div className="w-full px-6 md:px-10 xl:px-14 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl tracking-tighter uppercase font-montserrat flex items-baseline">
              <span className="text-transparent font-medium" style={{ WebkitTextStroke: isDarkMode ? '1px #e8e2da' : '1px #1A1A1A' }}>AU</span>
              <span className="font-black text-[#cca66b] drop-shadow-sm ml-1.5 font-bold">Toolkit</span>
            </span>
          </div>

          {/* Search bar inside header coordinates */}
          <div className="hidden md:flex items-center gap-2 border border-zinc-200 rounded-full bg-[#e8e2da] px-3.5 py-1.5 w-[300px] focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all">
            <Search size={14} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search tools, terms, shortcuts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-charcoal outline-none w-full font-sans"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-[10px] text-zinc-400 hover:text-black">
                ✖
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <button 
              onClick={() => setActiveTab("installation")} 
              className={`pb-1 hover:text-black transition-colors border-b ${activeTab === 'installation' ? 'border-black text-black' : 'border-transparent'}`}
            >
              Getting Started
            </button>
            <button 
              onClick={() => setActiveTab("quickref")} 
              className={`pb-1 hover:text-black transition-colors border-b ${activeTab === 'quickref' ? 'border-black text-black' : 'border-transparent'}`}
            >
              Quick Reference
            </button>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-400 font-mono text-[10.5px] font-normal">{utcTime}</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-1.5 ml-2 text-zinc-500 hover:text-black bg-[#fdfdfc]/50 rounded-full border border-zinc-200 transition-colors"
              title={isDarkMode ? "Switch to Normal Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>

          {/* Mobile responsive toggle */}
          <div className="flex md:hidden items-center gap-3">
            <span className="text-zinc-400 font-mono text-[10px]">{utcTime}</span>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-1.5 text-zinc-500 bg-zinc-50 border border-zinc-150 rounded-full hover:bg-zinc-100 transition-colors"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1.5 text-black bg-zinc-50 border border-zinc-150 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* FLOATING COMPANION TABS DOCK */}
      <div className="w-full flex justify-center sticky top-[80px] sm:top-[90px] md:top-[90px] z-50 pointer-events-none px-4 -mb-16">
        <nav className="pointer-events-auto bg-[#fbfaf3]/90 backdrop-blur-xl border border-[#e3d5bc] shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full p-1.5 flex items-center gap-1 overflow-x-auto scrollbar-none transform-gpu animate-fade-in text-xs">
          {(
            [
              { id: "installation", label: "Setup & Install", target: "installation" },
              { id: "effects", label: "1. Effects", target: "section-1" },
              { id: "expressions", label: "⚡ 2. Expressions", target: "section-2" },
              { id: "more", label: "3. More Tools", target: "section-3" },
              { id: "scripts", label: "4. Code Runner", target: "section-4" },
              { id: "launcher", label: "5. Launcher", target: "section-5" },
              { id: "quickref", label: "Reference", target: "quickref" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleNavClick(tab.id, tab.target)}
              className={`relative px-4 py-2.5 shrink-0 transition-colors duration-300 text-center font-montserrat flex items-center justify-center gap-1.5 cursor-pointer text-[10px] tracking-wider uppercase rounded-full group ${
                activeTab === tab.id
                  ? "text-black font-black"
                  : "text-[#7c7565] font-bold hover:text-black"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#c8a96e]/20 border border-[#c8a96e]/30 rounded-full"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              {activeTab !== tab.id && (
                <div className="absolute inset-0 bg-[#ebe3d5]/50 border border-[#e3d5bc]/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* MOBILE NAV PANEL */}
      {mobileMenuOpen && (
        <div className="bg-[#e8e2da] border-b border-zinc-200/65 md:hidden flex flex-col px-6 py-4 gap-4 text-sm uppercase tracking-wide font-semibold text-zinc-500">
          <div className="flex items-center gap-2 border border-zinc-150 rounded-full px-3 py-2 bg-zinc-50">
            <Search size={14} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search manual..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-charcoal outline-none w-full"
            />
          </div>
          <button onClick={() => { setActiveTab("installation"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'installation' && 'text-black'}`}>
            📦 1. Installation
          </button>
          <button onClick={() => { setActiveTab("effects"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'effects' && 'text-black'}`}>
            🎨 2. Effects Tab
          </button>
          <button onClick={() => { setActiveTab("expressions"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'expressions' && 'text-black'}`}>
            ⚡ 3. Expressions Tab
          </button>
          <button onClick={() => { setActiveTab("more"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'more' && 'text-black'}`}>
            📁 4. More Tools Tab
          </button>
          <button onClick={() => { setActiveTab("scripts"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'scripts' && 'text-black'}`}>
            💻 5. Code Runner Tab
          </button>
          <button onClick={() => { setActiveTab("launcher"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'launcher' && 'text-black'}`}>
            🚀 6. Launcher Tab
          </button>
          <button onClick={() => { setActiveTab("quickref"); setMobileMenuOpen(false); }} className={`text-left pb-1 ${activeTab === 'quickref' && 'text-black'}`}>
            📖 7. Quick Reference
          </button>
        </div>
      )}

      {/* SEARCH LIST DROPDOWN (ONLY SHOWS WHEN UNIVERSAL SEARCH TERM LENGTH > 0) */}
      {searchTerm && (
        <div className="w-full px-6 md:px-10 xl:px-14 mt-4">
          <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-150 pb-3 mb-4">
              <span className="text-[10px] font-sans font-bold text-zinc-400 tracking-wider uppercase">
                Search Results ({filteredTools.length} matches found for "{searchTerm}")
              </span>
              <button 
                onClick={() => setSearchTerm("")} 
                className="text-[10px] font-semibold text-zinc-400 hover:text-black border border-zinc-200 hover:border-zinc-300 px-2.5 py-1 rounded-full transition-colors"
              >
                Clear Search Results
              </button>
            </div>
            
            {filteredTools.length === 0 ? (
              <p className="text-xs text-zinc-500 font-light italic">No matching toolkit functions, expressions, or directory commands discovered. Try simple terms like 'srt', 'flicker', 'wiggle', or 'installation'.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <div 
                    key={tool.id}
                    onClick={() => handleLinkToTool(tool.tab, tool.id)}
                    className="border border-zinc-150 hover:border-zinc-300 bg-[#FDFDFD] rounded-xl p-4 cursor-pointer transition-all hover:scale-[1.01] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-sans font-semibold text-xs text-black">{tool.name}</h4>
                        <span className="text-[9px] font-mono uppercase bg-zinc-50 border border-zinc-100 text-zinc-400 px-2 py-0.5 rounded-full font-light">
                          {tool.type} · {tool.tab}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-normal font-light line-clamp-2">
                        {tool.desc}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-black font-semibold uppercase tracking-widest border-t border-zinc-50 pt-2">
                      <span>Refrence Document</span>
                      <ArrowRight size={10} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* COMPANION MAIN AREA */}
      <main className="flex-1 w-full flex flex-col">
        
        {/* TOP COMPANION BANNER (HERO SECTION - EDGE TO EDGE) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-[#f5f1ea] via-[#e8e2da] to-[#ebdcc2] border-b border-[#d1ccc7] w-full px-6 md:px-10 xl:px-14 py-16 sm:py-24 xl:py-32 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative overflow-hidden shadow-sm animate-fade-in"
        >

          {/* Center Info Area */}
          <div className="relative z-10 max-w-5xl w-full flex flex-col gap-6 items-center text-center mx-auto">
            
            {/* Active System pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="inline-flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-[#c8a96e] border border-[#d4b87e]/35 bg-white/60 backdrop-blur-xs px-4 py-1.5 rounded-full font-bold shadow-xs select-none"
            >
              <span className="w-1.5 h-1.5 bg-[#c8a96e] rounded-full animate-pulse" />
              <span>Adobe After Effects Panel</span>
            </motion.div>
 
            {/* Master display heading */}
            <div className="flex flex-col gap-0 w-full text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="font-montserrat text-[6rem] sm:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-bold tracking-tighter leading-none uppercase break-words flex flex-col md:flex-row items-center justify-center -space-y-4 md:space-y-0 md:gap-4 lg:gap-8 relative"
              >
                <span className="text-transparent" style={{ WebkitTextStroke: isDarkMode ? '2.5px rgba(255,255,255,0.8)' : '2.5px #2A2A2A' }}>AU</span>
                <span className="font-black bg-gradient-to-br from-[#cbb07e] via-[#b49866] to-[#8a6f3a] bg-clip-text text-transparent drop-shadow-sm hover:opacity-90 transition-opacity">Toolkit</span>
              </motion.h1>
              <div className="font-montserrat text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-[#cca66b] select-none mt-6">
                User Manual Companion
              </div>
            </div>

            {/* Detailed descriptor paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="text-[#645e52] font-sans font-normal leading-relaxed text-sm sm:text-base lg:text-xl max-w-3xl mt-4 mx-auto text-center"
            >
              A dockable After Effects panel with powerful tools for custom gradients, expression automation, project hierarchy organization, code scripting, and instant JSX package launching — all unified in one workspace.
            </motion.p>
          </div>
        </motion.div>

        {/* WORKSPACE SECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8 w-full px-6 md:px-10 xl:px-14">
          
          {/* LEFT AREA: DETAILED MANUALS VERTICAL STREAM */}
          <div className="lg:col-span-8 flex flex-col gap-16 w-full items-start">
            
            <InstallationSection activeTab={activeTab} />

            <EffectsSection 
              gradientType={gradientType}
              setGradientType={setGradientType}
              gradientColors={gradientColors}
              ccLightSweepActive={ccLightSweepActive}
              setCcLightSweepActive={setCcLightSweepActive}
              rotationActive={rotationActive}
              setRotationActive={setRotationActive}
              isAnimatingColors={isAnimatingColors}
              handleRandomizeColors={handleRandomizeColors}
              handleAnimateColors={handleAnimateColors}
              handleGenerateCode={handleGenerateCode}
            />

            <ExpressionsSection 
              activeExpSim={activeExpSim}
              setActiveExpSim={setActiveExpSim}
              isBouncing={isBouncing}
              wiggleOffset={wiggleOffset}
              flickerFreq={flickerFreq}
              setFlickerFreq={setFlickerFreq}
              flickerMin={flickerMin}
              setFlickerMin={setFlickerMin}
              flickerMax={flickerMax}
              setFlickerMax={setFlickerMax}
              bounceFreq={bounceFreq}
              setBounceFreq={setBounceFreq}
              bounceDecay={bounceDecay}
              setBounceDecay={setBounceDecay}
              triggerBounceDemo={triggerBounceDemo}
              wiggleFreq={wiggleFreq}
              setWiggleFreq={setWiggleFreq}
              wiggleAmp={wiggleAmp}
              setWiggleAmp={setWiggleAmp}
              copiedCode={copiedCode}
              copyToClipboard={copyToClipboard}
              handleGenerateCode={handleGenerateCode}
            />

            <MoreToolsSection 
              projectFiles={projectFiles}
              isOrganized={isOrganized}
              handleOrganizeProject={handleOrganizeProject}
              handleUndoOrganize={handleUndoOrganize}
              srtInput={srtInput}
              setSrtInput={setSrtInput}
              parsedSubtitles={parsedSubtitles}
              handleGenerateCode={handleGenerateCode}
            />

            <ScriptsSection 
              runnerButtons={runnerButtons}
              runnerLogs={runnerLogs}
              runCodeSim={runCodeSim}
              setShowAddModal={setShowAddModal}
              setRunnerLogs={setRunnerLogs}
              handleGenerateCode={handleGenerateCode}
            />

            <LauncherSection 
              scanFilter={launchQuery}
              setScanFilter={setLaunchQuery}
              launchFiles={launchFiles}
              setLaunchFiles={setLaunchFiles}
              setRunnerLogs={setRunnerLogs}
              handleGenerateCode={handleGenerateCode}
            />

            <QuickRefSection />

          </div>

          {/* RIGHT AREA: HIGH-FIDELITY INTERACTIVE COMPANION WORKSPACES */}
          <div className="lg:col-span-4 flex flex-col gap-6 bg-white/20 backdrop-blur-md border border-[#e3d5bc] rounded-3xl p-6 shadow-sm sticky top-[150px] z-10 max-h-[calc(100vh-190px)] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300">
            
            {/* COMPANION WORKSPACE CARD HEADER */}
            <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4">
              <span className="text-[10px] font-sans font-bold text-zinc-700 tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>
                AU COMPANION SIMULATOR
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase">Interactive Node</span>
            </div>

            {/* SIMULATOR 1: GRADIENTS / COMPOSITION PREVIEW (FOR EFFECTS TAB) */}
            {activeTab === "effects" && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div>
                  <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                    🎨 Visual Ramp &amp; Sweep Preview
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-normal">
                    Interactive simulation of Ramp Gradient, Randomizing Colors, and CC Light Sweep properties.
                  </p>
                </div>

                {/* Animated gradient preview block */}
                <div 
                  className="w-full h-[155px] rounded-2xl relative overflow-hidden shadow-inner border border-[#e3d5bc] flex items-center justify-center transition-all duration-1000"
                  style={{
                    background: gradientType === "ramp" 
                      ? `linear-gradient(180deg, ${gradientColors[0]}, ${gradientColors[1]})` 
                      : `radial-gradient(circle at 0% 0%, ${gradientColors[0]} 0%, transparent 60%), radial-gradient(circle at 100% 0%, ${gradientColors[1]} 0%, transparent 60%), radial-gradient(circle at 0% 100%, ${gradientColors[2]} 0%, transparent 60%), radial-gradient(circle at 100% 100%, ${gradientColors[3]} 0%, transparent 60%)`
                  }}
                >
                  {/* Sweep active overlay */}
                  {ccLightSweepActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[300%] h-full -skew-x-[25deg] animate-shine"></div>
                  )}

                  {/* Attachment Null Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[110px] h-[2px] bg-white/20 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-white animate-ping"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 border border-white absolute"></span>
                        <span className="text-[7.5px] font-mono text-white bg-black/85 px-1 py-0.5 rounded uppercase mt-3 select-none">
                          Trim_Null {rotationActive && "↺"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="py-1 px-3 bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono rounded-full uppercase select-none tracking-widest z-10">
                    {gradientType.toUpperCase()} {isAnimatingColors ? "· ANIMATING..." : "· STABLE"}
                  </span>
                </div>

                {/* Parameters rigging controllers */}
                <div className="space-y-3 p-4 bg-[#ede5d8] border border-[#e3d5bc] rounded-2xl text-xs">
                  
                  {/* Selector Gradient toggle */}
                  <div className="flex items-center justify-between border-b border-[#e3d5bc] pb-2">
                    <span className="font-semibold text-[#5c564f]">Method Target:</span>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setGradientType("ramp")}
                        className={`p-1 px-2.5 rounded-full text-[10px] font-semibold cursor-pointer ${gradientType === 'ramp' ? 'bg-black text-white' : 'text-zinc-550 hover:bg-zinc-100'}`}
                      >
                        Ramp
                      </button>
                      <button 
                        onClick={() => setGradientType("fourColor")}
                        className={`p-1 px-2.5 rounded-full text-[10px] font-semibold cursor-pointer ${gradientType === 'fourColor' ? 'bg-black text-white' : 'text-zinc-550 hover:bg-zinc-100'}`}
                      >
                        4-Color
                      </button>
                    </div>
                  </div>

                  {/* Sweep parameters */}
                  <div className="flex items-center justify-between border-b border-[#e3d5bc] pb-2">
                    <span className="font-semibold text-zinc-650">CC Light Sweep:</span>
                    <button 
                      onClick={() => setCcLightSweepActive(!ccLightSweepActive)}
                      className={`p-1 px-3 rounded-full text-[10px] font-semibold cursor-pointer ${ccLightSweepActive ? 'bg-[#5c9e8a] text-white' : 'bg-zinc-100 text-zinc-550'}`}
                    >
                      {ccLightSweepActive ? "Sweep On" : "Sweep Idle"}
                    </button>
                  </div>

                  {/* Rotation trim paths Null parameters */}
                  <div className="flex items-center justify-between border-b border-[#e3d5bc] pb-2">
                    <span className="font-semibold text-zinc-650">Rotate With Trim:</span>
                    <input 
                      type="checkbox" 
                      checked={rotationActive}
                      onChange={(e) => setRotationActive(e.target.checked)}
                      className="rounded border-zinc-200 text-black focus:ring-black h-4 w-4 cursor-pointer"
                    />
                  </div>

                  {/* Gradient randomize buttons */}
                  <div className="flex gap-2 pt-1.5">
                    <button 
                      onClick={handleRandomizeColors}
                      className="flex-1 bg-black text-white py-2.5 rounded-full uppercase font-mono tracking-widest text-[9.5px] cursor-pointer text-center font-bold hover:bg-zinc-800"
                    >
                      Random colors
                    </button>
                    <button 
                      onClick={handleAnimateColors}
                      disabled={isAnimatingColors}
                      className="flex-1 border border-zinc-150 py-2.5 rounded-full uppercase font-mono tracking-widest text-[9.5px] cursor-pointer text-center font-bold text-zinc-650 hover:border-zinc-350 disabled:opacity-40"
                    >
                      Animate colors
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-zinc-400 leading-normal font-light">
                  <strong>Expressions active:</strong> The bounding markers of gradient Points are currently linked using <code className="bg-white px-1 border rounded text-[9px]">source.width</code> and <code className="bg-white px-1 border rounded text-[9px]">source.height</code> dynamically.
                </div>
              </div>
            )}

            {/* SIMULATOR 2: EXPRESSIONS COMPILER & GENERATOR (FOR EXPRESSIONS TAB) */}
            {activeTab === "expressions" && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div>
                  <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                    📈 Physics Expression Builder
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-normal">
                    Select a core property algorithm, trim custom slider rig limits, and instantly copy ExtendScript block.
                  </p>
                </div>

                {/* Live simulation frame */}
                <div className="w-full h-[155px] bg-[#ede5d8] border border-[#e3d5bc] rounded-2xl relative flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]"></div>

                  {/* Simulated timeline node layer path */}
                  <div 
                    className={`w-11 h-11 bg-black rounded-xl border border-zinc-300 flex items-center justify-center transition-all ${
                      isBouncing ? "animate-bounce" : ""
                    }`}
                    style={{
                      transform: `translate(${wiggleOffset.x}px, ${wiggleOffset.y}px)`,
                      opacity: flickerOpacity / 100,
                    }}
                  >
                    <span className="text-white text-[10px] font-mono leading-none">AE_L</span>
                  </div>

                  <span className="absolute bottom-3 right-3 text-[9px] font-mono text-zinc-400 bg-zinc-50 border border-zinc-100 px-2 py-0.5 rounded-full select-none uppercase">
                    Preview Frame
                  </span>
                </div>

                {/* Picker tabs */}
                <div className="flex border border-[#e3d5bc] bg-zinc-50 rounded-full p-0.5 text-[10px] font-semibold select-none">
                  {["bounce", "flicker", "wiggle"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveExpSim(type as any)}
                      className={`flex-1 text-center py-1.5 rounded-full uppercase tracking-wider cursor-pointer font-bold ${
                        activeExpSim === type ? "bg-black text-white" : "text-zinc-500 hover:text-black"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Sub panels controls */}
                <div className="p-4 bg-[#ede5d8] border border-[#e3d5bc] rounded-2xl space-y-3.5 text-xs">
                  
                  {activeExpSim === "bounce" && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-zinc-500">Bounce Frequency:</span>
                          <span className="font-mono text-black font-semibold">{bounceFreq}hz</span>
                        </div>
                        <input 
                          type="range" min="1" max="10" step="0.5" 
                          value={bounceFreq} onChange={(e) => setBounceFreq(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-105 rounded-full appearance-none accent-black cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-zinc-500">Amplitude boundaries:</span>
                          <span className="font-mono text-black font-semibold">{bounceAmp}%</span>
                        </div>
                        <input 
                          type="range" min="10" max="120" step="5" 
                          value={bounceAmp} onChange={(e) => setBounceAmp(parseInt(e.target.value))}
                          className="w-full h-1 bg-zinc-105 rounded-full appearance-none accent-black cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-zinc-500">Spring decay scale:</span>
                          <span className="font-mono text-black font-semibold">{bounceDecay}</span>
                        </div>
                        <input 
                          type="range" min="1" max="15" step="0.5" 
                          value={bounceDecay} onChange={(e) => setBounceDecay(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-105 rounded-full appearance-none accent-black cursor-pointer"
                        />
                      </div>

                      <button 
                        onClick={triggerBounceDemo}
                        className="w-full py-2 bg-black hover:bg-zinc-800 text-white font-mono text-[9.5px] rounded-full uppercase tracking-wider font-bold cursor-pointer"
                      >
                        Run overshoot jump Test
                      </button>
                    </div>
                  )}

                  {activeExpSim === "flicker" && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-zinc-500">Flicker Speed:</span>
                          <span className="font-mono text-black font-semibold">{flickerFreq}hz</span>
                        </div>
                        <input 
                          type="range" min="2" max="24" step="1" 
                          value={flickerFreq} onChange={(e) => setFlickerFreq(parseInt(e.target.value))}
                          className="w-full h-1 bg-zinc-105 rounded-full appearance-none accent-black cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[10px] font-sans text-zinc-400 mb-1">Min Opacity</label>
                          <input 
                            type="number" min="0" max="90" 
                            value={flickerMin} onChange={(e) => setFlickerMin(parseInt(e.target.value) || 0)}
                            className="w-full border border-zinc-150 rounded-lg p-2 text-xs text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans text-zinc-400 mb-1">Max Opacity</label>
                          <input 
                            type="number" min="10" max="100" 
                            value={flickerMax} onChange={(e) => setFlickerMax(parseInt(e.target.value) || 100)}
                            className="w-full border border-zinc-150 rounded-lg p-2 text-xs text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeExpSim === "wiggle" && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-zinc-500">Wiggle Speed (Freq):</span>
                          <span className="font-mono text-black font-semibold">{wiggleFreq}hz</span>
                        </div>
                        <input 
                          type="range" min="1" max="20" step="0.5" 
                          value={wiggleFreq} onChange={(e) => setWiggleFreq(parseFloat(e.target.value))}
                          className="w-full h-1 bg-zinc-105 rounded-full appearance-none accent-black cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-semibold text-zinc-500">Wiggle Motion (Amp):</span>
                          <span className="font-mono text-black font-semibold">{wiggleAmp}px</span>
                        </div>
                        <input 
                          type="range" min="5" max="80" step="2" 
                          value={wiggleAmp} onChange={(e) => setWiggleAmp(parseInt(e.target.value))}
                          className="w-full h-1 bg-zinc-105 rounded-full appearance-none accent-black cursor-pointer"
                        />
                      </div>
                    </div>
                  )}

                  {/* Copy generate logic */}
                  <div className="border-t border-zinc-100 pt-3">
                    <span className="text-[8.5px] font-mono text-zinc-400 uppercase block mb-1.5 font-bold tracking-widest leading-none">// EXTENDSCRIPT CODE OUTPUT</span>
                    <pre className="p-3 bg-zinc-50 rounded-xl font-mono text-[10px] text-[#8a6f3a] overflow-x-auto h-[100px] border border-zinc-150 whitespace-pre scrollbar-thin select-all">
                      {activeExpSim === "bounce" ? getBounceCode() : activeExpSim === "flicker" ? getFlickerCode() : getWiggleCode()}
                    </pre>

                    <button 
                      onClick={() => copyToClipboard(
                        activeExpSim === "bounce" ? getBounceCode() : activeExpSim === "flicker" ? getFlickerCode() : getWiggleCode(),
                        activeExpSim.toUpperCase()
                      )}
                      className="w-full border border-zinc-150 hover:border-zinc-350 bg-white text-zinc-650 py-2.5 rounded-full uppercase font-mono tracking-widest text-[9.5px] cursor-pointer flex items-center justify-center gap-1.5 mt-3 font-semibold transition-all"
                    >
                      <Copy size={11} />
                      <span>{copiedCode === activeExpSim.toUpperCase() ? "COPIED TO CLIPBOARD!" : "COPY EXPRESSION"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SIMULATOR 3: FILES CATEGORIZER & SUBTITLES INGEST (FOR MORE TOOLS TAB) */}
            {activeTab === "more" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                
                {/* Organize panel simulator */}
                <div className="flex flex-col gap-3.5 border-b border-zinc-150 pb-5">
                  <div>
                    <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                      📁 Project Assets Folder Sandbox
                    </h4>
                    <p className="text-[11px] text-zinc-400 font-light leading-normal">
                      Trigger direct organization simulation and undo routines.
                    </p>
                  </div>

                  {/* Mock Folder Tree area */}
                  <div className="bg-[#FDFDFD] border border-zinc-150 rounded-2xl p-4 font-mono text-[10px] flex flex-col gap-2 min-h-[160px] overflow-y-auto">
                    {projectFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 border-b border-zinc-50 pb-1 hover:bg-zinc-50/50">
                        <Folder size={11} className={isOrganized ? "text-[#D4B87E]" : "text-zinc-300"} />
                        <span className="text-zinc-650 font-light truncate flex-1">{f.name}</span>
                        <span className="text-[8.5px] tracking-wide text-zinc-400 bg-zinc-50 px-1.5 py-0.5 rounded-full border border-zinc-100 uppercase">
                          {f.location}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={handleOrganizeProject}
                      disabled={isOrganized}
                      className="flex-1 bg-black hover:bg-zinc-800 disabled:opacity-40 text-white text-[9.5px] py-2.5 rounded-full uppercase font-mono tracking-widest font-bold cursor-pointer transition-all"
                    >
                      Organize Project
                    </button>
                    {isOrganized && (
                      <button 
                        onClick={handleUndoOrganize}
                        className="p-2.5 px-3 bg-white hover:bg-zinc-55 border border-zinc-150 rounded-full text-zinc-650 cursor-pointer flex items-center justify-center transition-all"
                        title="Undo organization"
                      >
                        <Undo size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Subtitles text block inputs */}
                <div>
                  <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                    💬 Subtitle Real-time Parser Simulator
                  </h4>
                  <textarea
                    value={srtInput}
                    onChange={(e) => setSrtInput(e.target.value)}
                    className="w-full text-[10px] font-mono leading-relaxed bg-[#FDFDFD] border border-zinc-150 rounded-xl p-3 focus:outline-none focus:border-zinc-300 h-[100px] resize-none overflow-y-auto"
                    placeholder="Paste standard srt timecode blocks here..."
                  />

                  {/* SRT parsed lists timeline boxes */}
                  <div className="mt-3.5 space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest font-bold text-zinc-400 block border-b border-zinc-50 pb-1.5 mb-2 leading-none">
                      🎬 COMPILED SUBTITLE LAYERS ({parsedSubtitles.length} lines)
                    </span>
                    <div className="max-h-[140px] overflow-y-auto space-y-1.5 pr-1 font-sans">
                      {parsedSubtitles.map((sub) => (
                        <div key={sub.id} className="text-[10px] bg-[#FDFDFD] border border-zinc-150 rounded-lg p-2 flex flex-col gap-0.5">
                          <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono font-medium">
                            <span>LAYER_{sub.id} // ACTIVE</span>
                            <span>{sub.start.split(",")[0]} {"→"} {sub.end.split(",")[0]}</span>
                          </div>
                          <span className="text-black font-semibold uppercase">{sub.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* SIMULATOR 4: CODE RUNNER SIM (FOR SCRIPTS TAB) */}
            {activeTab === "scripts" && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div>
                  <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                    💻 Simulated Extension Workstation
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-normal">
                    Trigger ExtendScript actions on mock timeline items. Review real debug logs.
                  </p>
                </div>

                {/* Simulated workspace panel container */}
                <div className="bg-[#FDFDFD] border border-zinc-150 rounded-2xl p-4 flex flex-col gap-3 shadow-xs">
                  <div className="flex items-center justify-between text-[8.5px] font-mono tracking-widest text-zinc-400 block border-b border-zinc-100 pb-2 mb-1 uppercase">
                    <span>AE COMPOSITON: ACTIVE_ITEM</span>
                    <span>HD 1920x1080</span>
                  </div>

                  {/* Visual list shortcuts */}
                  <div className="grid grid-cols-2 gap-2 text-left font-sans select-none">
                    {runnerButtons.map((btn, i) => (
                      <button
                        key={i}
                        onClick={() => runCodeSim(btn.name, btn.type, btn.code)}
                        className="p-2.5 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300 border border-zinc-150 rounded-xl text-left flex flex-col gap-1 transition-all group cursor-pointer"
                      >
                        <span className="text-[8px] font-mono uppercase bg-zinc-100 group-hover:bg-white text-zinc-405 border border-zinc-200 px-1.5 py-0.5 rounded-full inline-block tracking-wider w-fit">
                          {btn.type === 'Script' ? "📜 Jsx" : "⚡ Expr"}
                        </span>
                        <span className="text-[10px] font-semibold text-charcoal truncate">{btn.name}</span>
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="p-2 bg-transparent hover:bg-zinc-50 border border-dashed border-zinc-300 rounded-xl text-zinc-400 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all h-full min-h-[58px]"
                    >
                      <Plus size={14} />
                      <span className="text-[9px] font-sans font-semibold tracking-wider uppercase">Add Target Script</span>
                    </button>
                  </div>
                </div>

                {/* Dark execution log screen output */}
                <div className="bg-[#1A1A1A] text-zinc-300 font-mono text-[9px] rounded-2xl p-4.5 flex flex-col gap-2 shadow-md border border-zinc-800">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2 select-none text-[8px] uppercase tracking-widest text-zinc-500 font-bold leading-none">
                    <span>CONSOLE DIRECTORY // SYSTEM</span>
                    <span className="text-emerald-500 animate-pulse">● LIVE</span>
                  </div>
                  <div className="space-y-1.5 max-h-[110px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
                    {runnerLogs.map((log, i) => (
                      <div key={i} className={`border-l pl-2 ${log.includes("[ERR]") ? "text-rose-400 border-rose-500/10" : log.includes("[SUCCESS]") ? "text-emerald-400 border-emerald-500/10" : "text-sky-305/85 border-sky-500/5"}`}>
                        {log}
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setRunnerLogs(["[SYS] Database history scrubbed cleanly.", "[SYS] Standing by UI panels triggers."])}
                    className="mt-1 text-[8.5px] font-bold text-zinc-500 hover:text-white uppercase tracking-wider text-left underline cursor-pointer leading-none"
                  >
                    Clear Console Log
                  </button>
                </div>

                {/* Back modal popup simulation for scripts */}
                {showAddModal && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs">
                    <div className="relative w-full max-w-[360px] bg-[#FDFDFD] rounded-2xl border border-zinc-150 p-6 shadow-2xl font-sans animate-fade-in flex flex-col gap-4">
                      <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                        <span className="text-[10px] font-bold tracking-widest text-[#1A1A1A] uppercase">
                          GENERATE SHORTCUT BUTTON
                        </span>
                        <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-black">
                          ✖
                        </button>
                      </div>

                      <form onSubmit={handleCreateButton} className="space-y-3.5">
                        <div>
                          <label className="block text-[9px] text-zinc-400 uppercase font-semibold mb-1">Shortcut Name</label>
                          <input 
                            type="text" required placeholder="example: Apply Vignette"
                            value={newButtonName} onChange={(e) => setNewButtonName(e.target.value)}
                            className="w-full text-xs border border-zinc-150 rounded-lg p-2 outline-none font-sans"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] text-zinc-400 uppercase font-semibold mb-1">Trigger Type</label>
                            <select 
                              value={newButtonType} onChange={(e: any) => setNewButtonType(e.target.value)}
                              className="w-full text-xs border border-zinc-150 rounded-lg p-2 outline-none font-sans"
                            >
                              <option value="Script">Script (.jsx)</option>
                              <option value="Expression">Expression</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[9px] text-zinc-400 uppercase font-semibold mb-1">Folder Group</label>
                            <input 
                              type="text" required placeholder="Utility"
                              value={newButtonFolder} onChange={(e) => setNewButtonFolder(e.target.value)}
                              className="w-full text-xs border border-zinc-150 rounded-lg p-2 outline-none font-sans"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] text-zinc-400 uppercase font-semibold mb-1">Standard Extendscript Code</label>
                          <textarea 
                            rows={3} required placeholder="comp = app.project.activeItem; // coding block..."
                            value={newButtonCode} onChange={(e) => setNewButtonCode(e.target.value)}
                            className="w-full text-[10px] font-mono border border-zinc-150 rounded-lg p-2 outline-none resize-none leading-normal"
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-semibold rounded-full text-xs uppercase cursor-pointer"
                        >
                          LOCK BUTTON SHORTCUT
                        </button>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* SIMULATOR 5: LAUNCHER INTEGRATIVE SCANNER (FOR LAUNCHER TAB) */}
            {activeTab === "launcher" && (
              <div className="flex flex-col gap-4 animate-fade-in">
                <div>
                  <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                    🚀 System Directory Search
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-normal">
                    Search files under local scanner root, double click filename to trigger execution script mockups.
                  </p>
                </div>

                {/* Filter and search bar specific to directory scan panel */}
                <div className="flex items-center gap-2 border border-zinc-150 rounded-full px-3 py-2 bg-[#FDFDFD] focus-within:border-zinc-400 transition-all text-xs">
                  <Search size={12} className="text-zinc-400" />
                  <input 
                    type="text" placeholder="Filter directories..."
                    className="bg-transparent outline-none w-full text-[11px] text-charcoal font-sans font-light"
                    value={launchQuery} onChange={(e) => setLaunchQuery(e.target.value)}
                  />
                  {launchQuery && (
                    <button onClick={() => setLaunchQuery("")} className="text-[10px] text-zinc-400">✖</button>
                  )}
                </div>

                {/* Scanned files results timeline list */}
                <div className="bg-[#FDFDFD] border border-zinc-150 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between min-h-[180px]">
                  
                  <div className="divide-y divide-zinc-100 font-mono text-[9.5px] max-h-[180px] overflow-y-auto leading-relaxed">
                    {scannedFiles.length === 0 ? (
                      <div className="p-4 text-zinc-405 italic font-light text-[10.5px]">No files matching launcher directory queries. Try query 'AutoCrop' or 'Move'.</div>
                    ) : (
                      scannedFiles.map((file, i) => (
                        <div 
                          key={i} 
                          onDoubleClick={() => handleSimulateLaunch(file.name)}
                          className="p-3.5 flex items-center justify-between hover:bg-zinc-50 cursor-pointer group hover:border-[#c8a96e]/15 border-b border-transparent transition-all"
                          title="Double-click to launch script"
                        >
                          <div className="flex flex-col gap-0.5 truncate pr-2">
                            <span className="text-black font-semibold truncate group-hover:text-[#8a6f3a]">{file.name}</span>
                            <span className="text-[7.5px] text-zinc-400 truncate tracking-wide">{file.path}</span>
                          </div>
                          <span className="text-[8px] text-zinc-400 shrink-0 font-light">{file.size}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 border-t border-zinc-50 bg-zinc-50/50 flex justify-between items-center text-[8px] font-mono text-zinc-400 uppercase select-none tracking-wider">
                    <span>Scanner Root: Default Dir</span>
                    <button 
                      onClick={() => {
                        setLaunchFiles(prev => [
                          ...prev,
                          { name: "My_Custom_Runner_Tool.jsx", path: "/Scripts/Shared Cloud", size: "142kb", date: "2026-06-07" }
                        ]);
                        alert("➕ Custom cloud directory path mounted! Mounted: '/Scripts/Shared Cloud'. Re-scan completed.");
                      }}
                      className="text-black font-bold border rounded-full px-2 py-0.5 bg-white shadow-xs hover:bg-zinc-50 cursor-pointer"
                    >
                      + Add Cloud Dir
                    </button>
                  </div>
                </div>

                <div className="text-[9.5px] text-zinc-400 leading-normal font-light italic">
                  <strong>Trigger Hint:</strong> Double click on file nodes above to verify compilations. The companion scanner simulates After Effects launching.
                </div>
              </div>
            )}

            {/* REFERENCE SHEET OVERVIEW DESCRIPTIONS OR NOT ACTIVE CHAT */}
            {(activeTab === "installation" || activeTab === "quickref") && (
              <div className="flex flex-col gap-4 animate-fade-in font-sans">
                <div>
                  <h4 className="font-semibold text-xs text-black uppercase tracking-wider mb-1">
                    🛡️ System Integrity Diagnostic
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-light leading-normal">
                    Verify background system configuration matching After Effects guidelines.
                  </p>
                </div>

                <div className="bg-[#FDFDFD] border border-zinc-150 rounded-2xl p-5 space-y-4 text-xs font-light text-zinc-550 shadow-xs">
                  <div className="flex items-center justify-between border-b border-zinc-50 pb-2">
                    <span className="font-semibold text-zinc-500">AE Compatibility:</span>
                    <span className="font-mono text-black font-bold">AE 2022 - 2026+</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-50 pb-2">
                    <span className="font-semibold text-zinc-500">ScriptUI Spec:</span>
                    <span className="font-mono text-black font-bold">Dockable v2.1</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-50 pb-2">
                    <span className="font-semibold text-zinc-500">Secure Sandboxing:</span>
                    <span className="font-mono text-[#10B981] font-bold">Enabled (SSL)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-zinc-500">JSON DB Storage:</span>
                    <span className="font-mono text-black font-bold">Offline-First</span>
                  </div>
                </div>

                <div className="bg-zinc-100/50 rounded-xl p-4 border border-zinc-200">
                  <span className="block font-semibold text-[10px] text-charcoal uppercase mb-1.5 leading-none">📖 Reference Overview:</span>
                  <p className="text-[10.5px] text-zinc-500 font-light leading-normal">
                    This manual documents all active tools in the UI Extension panel. Simply follow the timeline selected checks on each tab for successful execution.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* COMPANION FOOTER RIGS */}
      <footer className="w-full overflow-hidden flex items-center justify-center min-h-[20vh] py-10">
        <FooterName />
      </footer>

    </div>
  );
}
