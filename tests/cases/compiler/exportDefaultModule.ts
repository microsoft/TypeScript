// @module: esnext, commonjs, amd, system
// @target: es5, esnext

// @filename: a.ts
export default module A {
    export const Foo = 1;
}

// @filename: b.ts
import A from "./a"
A.Foo;
