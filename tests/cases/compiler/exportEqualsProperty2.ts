// This test is just like exportDefaultProperty2, but with `export =`.

// @Filename: a.ts
class C {
    static B: number;
}
namespace C {
    export interface B { c: number }
}

export = C.B;

// @Filename: b.ts
import B = require("./a");
const x: B = { c: B };
