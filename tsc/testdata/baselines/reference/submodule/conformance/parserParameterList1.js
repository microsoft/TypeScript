//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList1.ts] ////

//// [parserParameterList1.ts]
class C {
   F(...A, B) { }
}

//// [parserParameterList1.js]
"use strict";
class C {
    F(...A, B) { }
}
