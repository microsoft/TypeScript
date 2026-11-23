// @noImplicitAny: true
// @declaration: true
// @noImplicitReferences: true
// @captureSuggestions: true
// @Filename: /untyped.js
exports.x = 1;
// @Filename: /index.ts
// @ts-expect-error
import { x } from "./untyped";
x;
