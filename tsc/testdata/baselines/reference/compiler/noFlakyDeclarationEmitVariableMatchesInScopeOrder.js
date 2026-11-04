//// [tests/cases/compiler/noFlakyDeclarationEmitVariableMatchesInScopeOrder.ts] ////

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

//// [globals.d.ts]
declare const gb: { [K in keyof typeof import("ma")]: 0 };
declare const ga: { [K in keyof typeof import("mb")]: 0 };
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");

//// [keys.d.ts]
interface Keys { readonly key: unique symbol }
declare const keys: Keys;
declare function mk(): { [keys.key]: 1 };

//// [main.ts]
/// <reference path="./ambient.d.ts" />
/// <reference path="./globals.d.ts" />
/// <reference path="./keys.d.ts" />
declare function expand<X>(): { [K in keyof X]: X[K] };
export const obj = mk();
export const obsA = expand<typeof oxa>();
export const obsB = expand<typeof oxb>();




//// [main.d.ts]
export declare const obj: {
    [Keys.key]: 1;
};
export declare const obsA: {
    pb: 0;
    readonly mb: 1;
    v: 0;
};
export declare const obsB: {
    v: 0;
};
