// @strict: true
// @skipLibCheck: true
// @module: commonjs
// @target: es2020
// @noEmit: true
// @noImplicitReferences: true

// @Filename: /ambient.d.ts
declare module "ma" {
    export { v as pa } from "xa";
    export const ma: 1;
}
declare module "mb" {
    export { v as pb } from "xb";
    export const mb: 1;
}
declare module "xa" {
    type T = typeof import("mb");
    interface O extends T { v: 0 }
    const o: O;
    export = o;
}
declare module "xb" {
    type T = typeof import("ma");
    interface O extends T { v: 0 }
    const o: O;
    export = o;
}
declare module "ia" {
    type T = typeof import("ma");
    interface O extends T { v: 0 }
    const o: O;
    export = o;
}
declare module "ib" {
    type T = typeof import("mb");
    interface O extends T { v: 0 }
    const o: O;
    export = o;
}

// @Filename: /mm.ts
/// <reference path="./ambient.d.ts" />
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");
declare const o: { x: 1 };
export = o;
export { v as a } from "ia";
export { v as b } from "ib";
export interface F1 {}
export interface F2 {}
export interface F3 {}
export interface F4 {}
export interface F5 {}
export interface F6 {}
export interface F7 {}
export interface F8 {}
export interface F9 {}
export interface F10 {}
export const checkA: 0 = oxa.pb;
export const checkB: 0 = oxb.pa;
