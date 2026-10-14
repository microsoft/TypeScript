// @declaration: true
// @emitDeclarationOnly: true
// @module: commonjs

// @filename: a.ts
export { B as A } from "./b";
export declare namespace A {
    export type FromA = number;
}
export class Route {
    private parts = 0;
}
export function create() { return new Route(); }

// @filename: b.ts
export { A as B } from "./a";
export declare namespace B {
    export type FromB = string;
}

// @filename: index.ts
import { A } from "./a";
import { create } from "./a";
export type Label = A.FromA;
export const route = create();