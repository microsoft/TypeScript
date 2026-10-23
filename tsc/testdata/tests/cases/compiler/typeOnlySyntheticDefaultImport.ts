// @target: es2015
// @module: commonjs
// @allowSyntheticDefaultImports: true
// @noEmit: true

// @filename: library.d.ts
export function render(): void;

// @filename: main.ts
import type { default as Library } from "./library";
type LibraryType = typeof Library;
