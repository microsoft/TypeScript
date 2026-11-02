// @strict: true
// @module: esnext
// @moduleResolution: bundler
// @resolveJsonModule: true
// @noEmit: true

// @filename: /types.d.ts
declare module "*.json" with { type: "text" } {
    const content: string;
    export default content;
}

// @filename: /data.json
// Not valid JSON — must not be loaded when the import matches the ambient above.
this is not json {{{

// @filename: /main.ts
// Regression for #65098: an import with attributes that matches a pattern
// ambient module must not pull the resolved file into the program.
import text from "./data.json" with { type: "text" };
const content: string = text;
export const length = content.length;

// Control: without matching attributes, resolveJsonModule still loads JSON.
import data from "./ok.json";
const n: number = data.n;

// @filename: /ok.json
{ "n": 1 }
