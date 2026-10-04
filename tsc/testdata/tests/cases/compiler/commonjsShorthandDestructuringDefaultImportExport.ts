// @target: es2015
// @module: commonjs
// @noTypesAndSymbols: true

// @filename: /a.ts
import { imported } from "./b";
export const exported = 2;
let a, b;
({ a = imported, b = exported } = {});

// @filename: /b.ts
export const imported = 1;
