"use client";

import { useState, useRef, useCallback } from "react";

const EXPRESSIONS = [
  { id: "neutral",   label: "Neutral",   emoji: "😐" },
  { id: "happy",     label: "Happy",     emoji: "😊" },
  { id: "angry",     label: "Angry",     emoji: "😠" },
  { id: "sad",       label: "Sad",       emoji: "😢" },
  { id: "excited",   label: "Excited",   emoji: "🤩" },
  { id: "love",      label: "Love",      emoji: "😍" },
  { id: "shocked",   label: "Shocked",   emoji: "😱" },
  { id: "scared",    label: "Scared",    emoji: "😨" },
  { id: "disgusted", label: "Disgusted", emoji: "🤢" },
  { id: "troll",     label: "Troll",     emoji: "😈" },
] as const;

export default function MemeGenerator() {
  const [selected, setSelected] = useState("neutral");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);

  const currentExpression = EXPRESSIONS.find((e) => e.id === selected)!;

  /* ── Download handler: draws image + text onto an offscreen canvas ── */
  const handleGenerate = useCallback(() => {
    const img = imageRef.current;
    if (!img || !img.complete) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;

    // Draw the rocky expression image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Text style — bold white with black stroke for meme look
    const fontSize = Math.round(canvas.width * 0.077);
    ctx.font = `bold ${fontSize}px "Impact", "Arial Black", sans-serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = Math.round(fontSize * 0.12);
    ctx.lineJoin = "round";

    // Top text — up to 2 lines
    if (topText.trim()) {
      const lines = wrapText(ctx, topText.trim(), canvas.width * 0.9);
      const topLines = lines.slice(0, 2);
      topLines.forEach((line, i) => {
        const y = fontSize * 1.2 + i * (fontSize * 1.15);
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillText(line, canvas.width / 2, y);
      });
    }

    // Bottom text — 1 line
    if (bottomText.trim()) {
      const y = canvas.height - fontSize * 0.5;
      ctx.strokeText(bottomText.trim(), canvas.width / 2, y);
      ctx.fillText(bottomText.trim(), canvas.width / 2, y);
    }

    // Build filename from texts
    const nameParts = [
      topText.trim(),
      bottomText.trim(),
    ].filter(Boolean);
    const memeName = nameParts.length
      ? nameParts.join("-").replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "_").substring(0, 60)
      : `rocky_${selected}`;

    // Trigger download
    const link = document.createElement("a");
    link.download = `${memeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [selected, topText, bottomText]);

  return (
    <div className="meme-page">
      {/* Sky BG with dark overlay — already applied via CSS */}

      <div className="meme-container">
        {/* Title */}
        <h1 className="meme-title font-numpty stoney-text">$ROCKY MEME GENERATOR</h1>

        <div className="meme-workspace" style={{ alignItems: 'center' }}>
          {/* ── LEFT: Image Preview ── */}
          <div className="meme-preview-col">
            <div className="meme-preview-frame">
              {/* Top text overlay */}
              {topText.trim() && (
                <div className="meme-overlay-text meme-overlay-top">
                  {topText}
                </div>
              )}

              {/* Rocky image — instant switch, no transition */}
              <img
                ref={imageRef}

                src={`/meme/${selected}.png`}
                alt={`Rocky ${currentExpression.label}`}
                className="meme-preview-img"
                crossOrigin="anonymous"
                draggable={false}
              />

              {/* Bottom text overlay */}
              {bottomText.trim() && (
                <div className="meme-overlay-text meme-overlay-bottom">
                  {bottomText}
                </div>
              )}
            </div>
          </div>
          {/* ── RIGHT: Controls ── */}
          <div className="meme-controls-col">
            {/* Expression Picker */}
            <div className="meme-section">
              <h2 className="meme-section-title font-numpty stoney-text">PICK EXPRESSION</h2>
              <div className="meme-expression-grid">
                {EXPRESSIONS.map((expr) => (
                  <button
                    key={expr.id}
                    onClick={() => setSelected(expr.id)}
                    className={`meme-expr-btn stone-btn ${
                      selected === expr.id ? "meme-expr-btn--active" : ""
                    }`}
                  >
                    <span className="meme-expr-emoji">{expr.emoji}</span>
                    <span className="meme-expr-name">{expr.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Inputs */}
            <div className="meme-section">
              <h2 className="meme-section-title font-numpty stoney-text">MEME TEXT</h2>

              <label className="meme-input-label" htmlFor="meme-top-text">
                Top Text <span className="meme-input-hint">(1-2 lines)</span>
              </label>
              <textarea
                id="meme-top-text"
                className="meme-input"
                placeholder="Enter top text..."
                maxLength={100}
                rows={2}
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
              />

              <label className="meme-input-label" htmlFor="meme-bottom-text">
                Bottom Text <span className="meme-input-hint">(1 line)</span>
              </label>
              <input
                id="meme-bottom-text"
                type="text"
                className="meme-input"
                placeholder="Enter bottom text..."
                maxLength={60}
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
              />
            </div>

            {/* Generate / Download */}
            <button
              onClick={handleGenerate}
              className="meme-generate-btn stone-btn"
            >
              ⬇ GENERATE &amp; DOWNLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Utility: word-wrap for canvas ── */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
