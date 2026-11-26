// @declaration: true
// @strict: true
// @target: esnext
// @allowJs: true
// @outDir: out

// @filename: lib.ts
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

// @filename: lib2.js
export const handler = () => 0;
handler.retries = 3;
handler["x-request-id"] = "abc";

// @filename: use.ts
import local, { handler, numeric, spaced, withSymbol, reservedAndNonIdentifier, constKey, identifiersOnly } from "./lib";
const s1: string = handler["x-request-id"];
const n1: number = handler.retries;
const s2: string = numeric[3];
const n2: number = spaced["a b"];
const n3: number = reservedAndNonIdentifier["b-c"] + reservedAndNonIdentifier.default;
const n4: number = constKey["d-e"];
const n5: number = local["f-g"] + local.a;
const n6: number = identifiersOnly.a + identifiersOnly.b;
