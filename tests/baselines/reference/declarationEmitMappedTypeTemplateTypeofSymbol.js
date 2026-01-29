//// [tests/cases/compiler/declarationEmitMappedTypeTemplateTypeofSymbol.ts] ////

//// [a.d.ts]
export declare const timestampSymbol: unique symbol;

export declare const Timestamp: {
    [TKey in typeof timestampSymbol]: true;
};

export declare function now(): typeof Timestamp;

//// [b.ts]
import * as x from "./a";
export const timestamp = x.now();

//// [c.ts]
import { now } from "./a";

export const timestamp = now();

//// [b.js]
import * as x from "./a";
export const timestamp = x.now();
//// [c.js]
import { now } from "./a";
export const timestamp = now();
