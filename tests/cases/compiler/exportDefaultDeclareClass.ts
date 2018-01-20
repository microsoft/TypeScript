// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default declare class A {
    foo(): number
 }

// @Filename: b.ts
import A from "./a";

const x = new A().foo();