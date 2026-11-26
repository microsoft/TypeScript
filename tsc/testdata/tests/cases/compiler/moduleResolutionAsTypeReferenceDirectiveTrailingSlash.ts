// @module: esnext
// @moduleResolution: bundler
// @noImplicitReferences: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// The module name "lib/" ends with a separator, so it names a directory. The
// lookup in "node_modules" fails, and the resolver then looks in the type root
// "/types". It skips the file lookup, so it does not use "/types/lib.d.ts" or
// "/types/lib/.d.ts". It uses "/types/lib/index.d.ts", so "fromFile" is an
// error.

// @filename: /types/lib.d.ts
export declare const fromFile: number;

// @filename: /types/lib/.d.ts
export declare const fromFile: number;

// @filename: /types/lib/index.d.ts
export declare const fromDirectory: number;

// @filename: /a.ts
import { fromDirectory, fromFile } from "lib/";
export const values = [fromDirectory, fromFile];
