//// [tests/cases/compiler/noFlakyDeclarationEmitRenamedExportOrder.ts] ////

//// [ambient.d.ts]
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

//// [globals.d.ts]
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");

//// [lib.d.ts]
interface X { x: 1 }
export { X as Y };
export { v as a } from "ia";
export { v as b } from "ib";
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
export declare function getX(): X;

//// [main.ts]
/// <reference path="./ambient.d.ts" />
/// <reference path="./globals.d.ts" />
import { getX } from "./lib";
declare function expand<X>(): { [K in keyof X]: X[K] };
export const x = getX();
export const obsA = expand<typeof oxa>();
export const obsB = expand<typeof oxb>();




//// [main.d.ts]
export declare const x: import("./lib").Y;
export declare const obsA: {
    pb: 0;
    readonly mb: 1;
    v: 0;
};
export declare const obsB: {
    v: 0;
};
