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

// @Filename: /index.d.ts
export { v as b } from "ia";
export { v as a } from "ib";
export declare const f1: 1;
export declare const f2: 2;
export declare const f3: 3;
export declare const f4: 4;
export declare const f5: 5;
export declare const f6: 6;
export declare const f7: 7;
export declare const f8: 8;
export declare const f9: 9;
export declare const f10: 10;

// @Filename: /gadget.d.ts
export interface Gadget { id: number }

// @Filename: /widget.d.ts
import { Gadget } from "./gadget";
export declare function makeWidget(): Gadget;

// @Filename: /main.ts
/// <reference path="./ambient.d.ts" />
import { f1 } from "./index";
import { makeWidget } from "./widget";
declare function expand<X>(): { [K in keyof X]: X[K] };
export const keep = f1;
export const w = makeWidget();
export const obsA = expand<typeof import("xa")>();
export const obsB = expand<typeof import("xb")>();
