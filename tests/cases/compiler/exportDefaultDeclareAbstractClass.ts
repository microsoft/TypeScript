// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts
export default declare abstract class A {
    foo(): number
 }

// @Filename: b.ts
import A from "./a";

class B extends A {
    foo() {
        return 0;
    }
}