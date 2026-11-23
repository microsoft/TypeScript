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
declare module "s1" {
    export { v as a } from "ia";
    export { v as b } from "ib";
    export const f1: 1;
    export const f2: 2;
    export const f3: 3;
    export const f4: 4;
    export const f5: 5;
    export const f6: 6;
    export const f7: 7;
    export const f8: 8;
    export const f9: 9;
    export const f10: 10;
}
declare module "s2" {
    export const a: 1;
    export const b: 2;
    export const g1: 1;
    export const g2: 2;
    export const g3: 3;
    export const g4: 4;
    export const g5: 5;
    export const g6: 6;
    export const g7: 7;
    export const g8: 8;
    export const g9: 9;
    export const g10: 10;
}
declare module "m1" {
    export * from "s1";
    export * from "s2";
}

// @Filename: /main.ts
/// <reference path="./ambient.d.ts" />
import { f1 } from "m1";
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");
declare function expand<X>(): { [K in keyof X]: X[K] };
export const keep = f1;
export const obsA: never = expand<typeof oxa>();
export const obsB: never = expand<typeof oxb>();
