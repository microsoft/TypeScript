// @module: node18,nodenext
// @rewriteRelativeImportExtensions: true
// @noTypesAndSymbols: true
// @noEmit: true
// @noImplicitReferences: true

// @Filename: /node_modules/lodash-ts/add.ts
export function add(a: number, b: number) {
    return a + b;
}

// @Filename: /index.ts
import { add } from "lodash-ts/add.ts"; // Ok
