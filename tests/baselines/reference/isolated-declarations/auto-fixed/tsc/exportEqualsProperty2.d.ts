//// [tests/cases/compiler/exportEqualsProperty2.ts] ////

//// [b.ts]
import B = require("./a");
const x: B = { c: B };

//// [a.ts]
// This test is just like exportDefaultProperty2, but with `export =`.

class C {
    static B: number;
}
namespace C {
    export interface B { c: number }
}

export = C.B;


/// [Declarations] ////



//// [a.d.ts]
declare const _default: number;
export = _default;

//// [b.d.ts]
export {};
