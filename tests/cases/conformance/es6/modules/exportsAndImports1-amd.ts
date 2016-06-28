// @module: amd
// @target: ES5

// @filename: t1.ts
var v = 1;
function f() { }
class C {
}
interface I {
}
enum E {
    A, B, C
}
const enum D {
    A, B, C
}
module M {
    export var x;
}
module N {
    export interface I {
    }
}
type T = number;
import a = M.x;

export { v, f, C, I, E, D, M, N, T, a };

// @filename: t2.ts
export { v, f, C, I, E, D, M, N, T, a } from "./t1";

// @filename: t3.ts
import { v, f, C, I, E, D, M, N, T, a } from "./t1";
export { v, f, C, I, E, D, M, N, T, a };
