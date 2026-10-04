// @module: commonjs
// @declaration: true
// @filename: a.ts
export type Foo = { x: string };
export namespace Bar {
    export interface Baz { y: number }
}
namespace mod {
    export const a = 1;
    export const b = "hello";
}
export = mod;
// @filename: b.ts
import a = require("./a");
const c1 = a.a;
const c2 = a.b;
let v1: a.Foo = { x: "test" };
let v2: a.Bar.Baz = { y: 42 };
