//// [tests/cases/compiler/exportDefaultProperty2.ts] ////

//// [a.ts]
class C {
    static B: number;
}
namespace C {
    export interface B { c: number }
}

export default C.B;

//// [b.ts]
import B from "./a";
const x: B = { c: B };


//// [a.js]
class C {
}
export default C.B;
//// [b.js]
import B from "./a";
const x = { c: B };
