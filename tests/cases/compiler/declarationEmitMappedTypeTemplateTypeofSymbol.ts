// @strict: true
// @declaration: true
// @filename: a.d.ts
// @isolatedDeclarationFixedDiffReason: There will be separate TS error on 'timestamp', but fixer does not know about this so it'll try to fix the missing type.
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