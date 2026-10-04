// @module: preserve
// @target: esnext
// @resolveJsonModule: true
// @noEmit: true
// @noTypesAndSymbols: true

// @Filename: data.json
{}

// @Filename: main.ts
import data1 from "./data.json" with { type: "json" };
const data2 = await import("./data.json", { with: { type: "json" } });
