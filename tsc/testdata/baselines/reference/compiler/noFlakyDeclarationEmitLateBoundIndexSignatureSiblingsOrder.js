//// [tests/cases/compiler/noFlakyDeclarationEmitLateBoundIndexSignatureSiblingsOrder.ts] ////

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

//// [main.ts]
/// <reference path="./ambient.d.ts" />
declare const k: string;
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");
declare function expand<X>(): { [K in keyof X]: X[K] };
export class C {
    [k]: unknown;
    sa = { ...(null! as typeof import("ma")) };
    sb = { ...(null! as typeof import("mb")) };
    f1 = 1;
    f2 = 2;
    f3 = 3;
    f4 = 4;
    f5 = 5;
    f6 = 6;
    f7 = 7;
    f8 = 8;
    f9 = 9;
    f10 = 10;
}
export const obsA = expand<typeof oxa>();
export const obsB = expand<typeof oxb>();




//// [main.d.ts]
declare const k: string;
export declare class C {
    [k]: unknown;
    sa: {
        pa: 0;
        ma: 1;
    };
    sb: {
        pb: 0;
        mb: 1;
    };
    f1: number;
    f2: number;
    f3: number;
    f4: number;
    f5: number;
    f6: number;
    f7: number;
    f8: number;
    f9: number;
    f10: number;
}
export declare const obsA: {
    pb: 0;
    readonly mb: 1;
    v: 0;
};
export declare const obsB: {
    v: 0;
};
export {};
