// @filename: a.ts
export default declare class C {
    public foo: number;
}

// @filename: b.ts
import A from "./a"
let a: A;
a.foo
