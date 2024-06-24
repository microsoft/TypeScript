// @module: preserve
// @target: esnext
// @resolveJsonModule: true
// @noEmit: true
// @moduleDetection: force
// @noTypesAndSymbols: true

// @Filename: data.json
{}

// @Filename: main.ts
const data = await import("./data.json", { with: { type: "json" } });
