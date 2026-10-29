// @strict: true
// @skipLibCheck: true
// @module: commonjs
// @target: es2020
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: /out
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
declare module "mm" {
    const o: { x: 1 };
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
}

// @Filename: /main.ts
/// <reference path="./ambient.d.ts" />
import { x } from "mm";
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");
declare function expand<X>(): { [K in keyof X]: X[K] };
export const keep = x;
export const obsA = expand<typeof oxa>();
export const obsB = expand<typeof oxb>();
