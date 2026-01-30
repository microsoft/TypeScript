//// [tests/cases/compiler/parseErrorDoubleCommaInCall.ts] ////

//// [parseErrorDoubleCommaInCall.ts]
Boolean({
    x: 0,,
});


//// [parseErrorDoubleCommaInCall.js]
"use strict";
Boolean({
    x: 0,
});
