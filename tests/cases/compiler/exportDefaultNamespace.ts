// @filename: a.ts
export default namespace A {
    export const Foo = 1;
}

// @filename: b.ts
import A from "./a"
A.Foo
