// @module: esnext
// @noTypesAndSymbols: true

// @filename: /a.ts
export interface A {
    a: number;
}

// @filename: /b.ts
import * as ns from "./a";

export import A = ns.A;
