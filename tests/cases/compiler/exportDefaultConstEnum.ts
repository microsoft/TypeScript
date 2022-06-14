// @filename: a.ts
export default const enum A {
    A,
    B
}

// @filename: b.ts
import A from "./a"

A.A;
A.B;
