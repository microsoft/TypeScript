// @module: esnext
// @target: esnext
// @strict: true
// @noEmit: true
// @noImplicitReferences: true
// @jsx: preserve

// @filename: a.js
export const a = 1;

// @filename: b.mjs
export const b = 1;

// @filename: c.cjs
exports.c = 1;

// @filename: d.jsx
export const d = <div />;

// @filename: e.ts
import source a from "./a.js";
import source b from "./b.mjs";
import source c from "./c.cjs";
import source d from "./d.jsx";
const e = import.source("./a.js");

const f: any = a;
const g: any = b;
const h: any = c;
const i: any = d;
const j: Promise<any> = e;
