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

// @Filename: /ua.d.ts
import { v } from "ia";
export = v;
export as namespace UA;

// @Filename: /ub.d.ts
import { v } from "ib";
export = v;
export as namespace UB;

// @Filename: /uf1.d.ts
declare const x: 1;
export = x;
export as namespace UF1;

// @Filename: /uf2.d.ts
declare const x: 2;
export = x;
export as namespace UF2;

// @Filename: /uf3.d.ts
declare const x: 3;
export = x;
export as namespace UF3;

// @Filename: /uf4.d.ts
declare const x: 4;
export = x;
export as namespace UF4;

// @Filename: /uf5.d.ts
declare const x: 5;
export = x;
export as namespace UF5;

// @Filename: /uf6.d.ts
declare const x: 6;
export = x;
export as namespace UF6;

// @Filename: /uf7.d.ts
declare const x: 7;
export = x;
export as namespace UF7;

// @Filename: /uf8.d.ts
declare const x: 8;
export = x;
export as namespace UF8;

// @Filename: /uf9.d.ts
declare const x: 9;
export = x;
export as namespace UF9;

// @Filename: /uf10.d.ts
declare const x: 10;
export = x;
export as namespace UF10;

// @Filename: /main.ts
/// <reference path="./ambient.d.ts" />
/// <reference path="./ua.d.ts" />
/// <reference path="./ub.d.ts" />
/// <reference path="./uf1.d.ts" />
/// <reference path="./uf2.d.ts" />
/// <reference path="./uf3.d.ts" />
/// <reference path="./uf4.d.ts" />
/// <reference path="./uf5.d.ts" />
/// <reference path="./uf6.d.ts" />
/// <reference path="./uf7.d.ts" />
/// <reference path="./uf8.d.ts" />
/// <reference path="./uf9.d.ts" />
/// <reference path="./uf10.d.ts" />
declare const oxa: typeof import("xa");
declare const oxb: typeof import("xb");
declare function expand<X>(): { [K in keyof X]: X[K] };
const q = zz;
const obsA: never = expand<typeof oxa>();
const obsB: never = expand<typeof oxb>();
