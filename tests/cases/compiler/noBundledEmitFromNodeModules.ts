// @outFile: out.js
// @module: system
// @moduleResolution: bundler
// @noImplicitReferences: true

// @fileName: /node_modules/projB/index.ts
export class C {}

// @fileName: /a.ts
import { C } from "projB";
