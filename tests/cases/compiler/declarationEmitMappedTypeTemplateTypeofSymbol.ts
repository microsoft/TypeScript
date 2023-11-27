// @strict: true
// @declaration: true
// @filename: a.d.ts
// @isolatedDeclarationFixedDiffReason: TODO File is not auto-fixed. Symbol is not imported.
export declare const timestampSymbol: unique symbol;

export declare const Timestamp: {
    [TKey in typeof timestampSymbol]: true;
};

export declare function now(): typeof Timestamp;

// @filename: b.ts
import * as x from "./a";
export const timestamp = x.now();

// @filename: c.ts
import { now } from "./a";

export const timestamp = now();