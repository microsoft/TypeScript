// @target: es5
// @module: commonjs
// @filename: a.ts
import { b } from './b';
export const a = {
    f: () => {
        class A { }
        class B extends A { }
        b.f();
    }
};
// @filename: b.ts
import { a } from './a';
export const b = {
    f: () => {
        class A { }
        class B extends A { }
        a.f();
    }
};