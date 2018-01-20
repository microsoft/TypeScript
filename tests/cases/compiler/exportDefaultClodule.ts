// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default class A {
    A1: string
}
export default namespace A {
    export const A2 = 32;
}

// @Filename: b.ts
import A from "./a";

const a = new A();
const a2 = A.A2;