//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsEnums.ts] ////

//// [index.js]
// Pretty much all of this should be an error, (since enums are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless

export enum A {}

export enum B {
    Member
}

enum C {}

export { C };

enum DD {}

export { DD as D };

export enum E {}
export { E as EE };

export { F as FF };
export enum F {}

export enum G {
    A = 1,
    B,
    C
}

export enum H {
    A = "a",
    B = "b"
}

export enum I {
    A = "a",
    B = 0,
    C
}

export const enum J {
    A = 1,
    B,
    C
}

export enum K {
    None   = 0,
    A = 1 << 0,
    B = 1 << 1,
    C = 1 << 2,
    Mask = A | B | C,
}

export const enum L {
    None   = 0,
    A = 1 << 0,
    B = 1 << 1,
    C = 1 << 2,
    Mask = A | B | C,
}


//// [index.js]
"use strict";
// Pretty much all of this should be an error, (since enums are forbidden in js),
// but we should be able to synthesize declarations from the symbols regardless
Object.defineProperty(exports, "__esModule", { value: true });
exports.K = exports.I = exports.H = exports.G = exports.F = exports.FF = exports.EE = exports.E = exports.D = exports.C = exports.B = exports.A = void 0;
var A;
(function (A) {
})(A || (exports.A = A = {}));
var B;
(function (B) {
    B[B["Member"] = 0] = "Member";
})(B || (exports.B = B = {}));
var C;
(function (C) {
})(C || (exports.C = C = {}));
var DD;
(function (DD) {
})(DD || (exports.D = DD = {}));
var E;
(function (E) {
})(E || (exports.EE = exports.E = E = {}));
var F;
(function (F) {
})(F || (exports.F = exports.FF = F = {}));
var G;
(function (G) {
    G[G["A"] = 1] = "A";
    G[G["B"] = 2] = "B";
    G[G["C"] = 3] = "C";
})(G || (exports.G = G = {}));
var H;
(function (H) {
    H["A"] = "a";
    H["B"] = "b";
})(H || (exports.H = H = {}));
var I;
(function (I) {
    I["A"] = "a";
    I[I["B"] = 0] = "B";
    I[I["C"] = 1] = "C";
})(I || (exports.I = I = {}));
var K;
(function (K) {
    K[K["None"] = 0] = "None";
    K[K["A"] = 1] = "A";
    K[K["B"] = 2] = "B";
    K[K["C"] = 4] = "C";
    K[K["Mask"] = 7] = "Mask";
})(K || (exports.K = K = {}));


//// [index.d.ts]
export enum A {
}
export enum B {
    Member = 0
}
export enum E {
}
export enum F {
}
export enum G {
    A = 1,
    B = 2,
    C = 3
}
export enum H {
    A = "a",
    B = "b"
}
export enum I {
    A = "a",
    B = 0,
    C = 1
}
export const enum J {
    A = 1,
    B = 2,
    C = 3
}
export enum K {
    None = 0,
    A = 1,
    B = 2,
    C = 4,
    Mask = 7
}
export const enum L {
    None = 0,
    A = 1,
    B = 2,
    C = 4,
    Mask = 7
}
export enum C {
}
declare enum DD {
}
export { DD as D, E as EE, F as FF };
