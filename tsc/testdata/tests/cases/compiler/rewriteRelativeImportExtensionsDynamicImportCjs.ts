// @target: esnext
// @module: nodenext
// @rewriteRelativeImportExtensions: true
// @disableDynamicImportExtensionRewriting: true, false
// @noTypesAndSymbols: true

// @filename: index.cts
import { getSpecifier } from "./specifier.cjs";

import(getSpecifier());

// @filename: specifier.cts
export function getSpecifier() {
    return "./target.ts";
}

// @filename: target.ts
export {};
