// @module: esnext
// @moduleResolution: bundler
// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// The module name "lib/" ends with a separator, so it names a directory. The
// lookup in "node_modules" fails, and the resolver then looks in the type root
// "/types". It skips the file lookup and uses "/types/lib/index.d.ts", not
// "/types/lib/.d.ts". So "fromFile" is an error.

// @filename: /types/lib/.d.ts
export declare const fromFile: number;

// @filename: /types/lib/index.d.ts
export declare const fromDirectory: number;

// @filename: /a.ts
import { fromDirectory, fromFile } from "lib/";
export const values = [fromDirectory, fromFile];
