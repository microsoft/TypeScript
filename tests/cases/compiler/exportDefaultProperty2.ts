// This test is just like exportEqualsProperty2, but with `export default`.

// @Filename: a.ts
class C {
    static B: number;
}
namespace C {
    export interface B { c: number }
}

export default C.B;

// @Filename: b.ts
import B from "./a";
const x: B = { c: B };
