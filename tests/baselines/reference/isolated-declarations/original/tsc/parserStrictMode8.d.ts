//// [tests/cases/conformance/parser/ecmascript5/StrictMode/parserStrictMode8.ts] ////

//// [parserStrictMode8.ts]
"use strict";
function eval() {
}

/// [Declarations] ////



//// [/.src/parserStrictMode8.d.ts]
/// [Errors] ////

parserStrictMode8.ts(2,10): error TS1100: Invalid use of 'eval' in strict mode.


==== parserStrictMode8.ts (1 errors) ====
    "use strict";
    function eval() {
             ~~~~
!!! error TS1100: Invalid use of 'eval' in strict mode.
    }