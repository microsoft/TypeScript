//// [tests/cases/conformance/parser/ecmascript5/StrictMode/parserStrictMode8.ts] ////

//// [parserStrictMode8.ts]
"use strict";
function eval() {
}

/// [Declarations] ////



//// [parserStrictMode8.d.ts]
declare function eval(): invalid;

/// [Errors] ////

parserStrictMode8.ts(2,10): error TS1100: Invalid use of 'eval' in strict mode.
parserStrictMode8.ts(2,10): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== parserStrictMode8.ts (2 errors) ====
    "use strict";
    function eval() {
             ~~~~
!!! error TS1100: Invalid use of 'eval' in strict mode.
             ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }