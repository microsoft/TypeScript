//// [tests/cases/compiler/declarationEmitCircularMergedExportAliases.ts] ////

//// [a.ts]
export { B as A } from "./b";
export declare namespace A {
    export type FromA = number;
}
export class Route {
    private parts = 0;
}
export function create() { return new Route(); }

//// [b.ts]
export { A as B } from "./a";
export declare namespace B {
    export type FromB = string;
}

//// [index.ts]
import { A } from "./a";
import { create } from "./a";
export type Label = A.FromA;
export const route = create();



//// [b.d.ts]
export { A as B } from "./a";
export declare namespace B {
    type FromB = string;
}
//// [a.d.ts]
export { B as A } from "./b";
export declare namespace A {
    type FromA = number;
}
export declare class Route {
    private parts;
}
export declare function create(): Route;
//// [index.d.ts]
import { A } from "./a";
export type Label = A.FromA;
export declare const route: import("./a").Route;
