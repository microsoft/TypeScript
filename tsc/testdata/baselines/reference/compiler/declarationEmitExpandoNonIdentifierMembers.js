//// [tests/cases/compiler/declarationEmitExpandoNonIdentifierMembers.ts] ////

//// [lib.ts]
export const handler = () => 0;
handler.retries = 3;
handler["x-request-id"] = "abc";

export const numeric = () => {};
numeric.a = 1;
numeric[3] = "n";

export const spaced = function () {};
spaced.a = 1;
spaced["a b"] = 2;

const sym = Symbol();
export const withSymbol = () => {};
withSymbol.a = 1;
withSymbol[sym] = true;

export const reservedAndNonIdentifier = () => {};
reservedAndNonIdentifier.default = 1;
reservedAndNonIdentifier["b-c"] = 2;

const key = "d-e";
export const constKey = () => {};
constKey.a = 1;
constKey[key] = 2;

const local = () => {};
local.a = 1;
local["f-g"] = 2;
export default local;

export const identifiersOnly = () => {};
identifiersOnly.a = 1;
identifiersOnly["b"] = 2;

//// [lib2.js]
export const handler = () => 0;
handler.retries = 3;
handler["x-request-id"] = "abc";

//// [use.ts]
import local, { handler, numeric, spaced, withSymbol, reservedAndNonIdentifier, constKey, identifiersOnly } from "./lib";
const s1: string = handler["x-request-id"];
const n1: number = handler.retries;
const s2: string = numeric[3];
const n2: number = spaced["a b"];
const n3: number = reservedAndNonIdentifier["b-c"] + reservedAndNonIdentifier.default;
const n4: number = constKey["d-e"];
const n5: number = local["f-g"] + local.a;
const n6: number = identifiersOnly.a + identifiersOnly.b;


//// [lib.js]
export const handler = () => 0;
handler.retries = 3;
handler["x-request-id"] = "abc";
export const numeric = () => { };
numeric.a = 1;
numeric[3] = "n";
export const spaced = function () { };
spaced.a = 1;
spaced["a b"] = 2;
const sym = Symbol();
export const withSymbol = () => { };
withSymbol.a = 1;
withSymbol[sym] = true;
export const reservedAndNonIdentifier = () => { };
reservedAndNonIdentifier.default = 1;
reservedAndNonIdentifier["b-c"] = 2;
const key = "d-e";
export const constKey = () => { };
constKey.a = 1;
constKey[key] = 2;
const local = () => { };
local.a = 1;
local["f-g"] = 2;
export default local;
export const identifiersOnly = () => { };
identifiersOnly.a = 1;
identifiersOnly["b"] = 2;
//// [lib2.js]
export const handler = () => 0;
handler.retries = 3;
handler["x-request-id"] = "abc";
//// [use.js]
import local, { handler, numeric, spaced, reservedAndNonIdentifier, constKey, identifiersOnly } from "./lib";
const s1 = handler["x-request-id"];
const n1 = handler.retries;
const s2 = numeric[3];
const n2 = spaced["a b"];
const n3 = reservedAndNonIdentifier["b-c"] + reservedAndNonIdentifier.default;
const n4 = constKey["d-e"];
const n5 = local["f-g"] + local.a;
const n6 = identifiersOnly.a + identifiersOnly.b;


//// [lib.d.ts]
export declare const handler: {
    (): number;
    retries: number;
    "x-request-id": string;
};
export declare const numeric: {
    (): void;
    a: number;
    3: string;
};
export declare const spaced: {
    (): void;
    a: number;
    "a b": number;
};
declare const sym: unique symbol;
export declare const withSymbol: {
    (): void;
    a: number;
    [sym]: boolean;
};
export declare const reservedAndNonIdentifier: {
    (): void;
    default: number;
    "b-c": number;
};
export declare const constKey: {
    (): void;
    a: number;
    "d-e": number;
};
declare const local: {
    (): void;
    a: number;
    "f-g": number;
};
export default local;
export declare function identifiersOnly(): void;
export declare namespace identifiersOnly {
    var a: number;
    var b: number;
}
//// [lib2.d.ts]
export declare const handler: {
    (): number;
    retries: number;
    "x-request-id": string;
};
//// [use.d.ts]
export {};
