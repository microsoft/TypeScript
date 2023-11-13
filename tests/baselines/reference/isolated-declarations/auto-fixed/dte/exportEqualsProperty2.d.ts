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
declare const _default: invalid;
export = _default;

//// [b.d.ts]
export {};
/// [Errors] ////

a.ts(10,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== b.ts (0 errors) ====
    import B = require("./a");
    const x: B = { c: B };
    
==== a.ts (1 errors) ====
    // This test is just like exportDefaultProperty2, but with `export =`.
    
    class C {
        static B: number;
    }
    namespace C {
        export interface B { c: number }
    }
    
    export = C.B;
             ~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    