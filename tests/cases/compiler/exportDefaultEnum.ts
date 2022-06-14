// @module: esnext, commonjs, amd, system
// @target: es5, esnext

// @filename: a.ts
export default enum A {
    A,
    B
}

// @filename: b.ts
import A from "./a"

A.A;
A.B;
