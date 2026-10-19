// @module: nodenext
// @noImplicitAny: true
// @declaration: true
// @noImplicitReferences: true
// @captureSuggestions: true
// @Filename: /untyped.mjs
export const x = 1;
// @Filename: /index.mts
// @ts-expect-error
import { x } from "./untyped.mjs";
x;
