//// [tests/cases/conformance/parser/ecmascript5/Generics/parserGreaterThanTokenAmbiguity15.ts] ////

//// [parserGreaterThanTokenAmbiguity15.ts]
1 
// before
>>= // after
2;

//// [parserGreaterThanTokenAmbiguity15.js]
"use strict";
1
    // before
    >>= // after
        2;
