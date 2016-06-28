// @module: commonjs
// @declaration: true

// @filename: server.ts
export interface I {
    prop: string;
}
export interface I2 {
    prop2: string;
}
export class C implements I {
    prop = "hello";
}
export class C2 implements I2 {
    prop2 = "world";
}

// @filename: client.ts
import { C, I, C2 } from "./server"; // Shouldnt emit I and C2 into the js file and emit C and I in .d.ts file
export type cValInterface = I;
export var cVal = new C();