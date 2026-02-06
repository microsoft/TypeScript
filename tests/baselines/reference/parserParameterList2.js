//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList2.ts] ////

//// [parserParameterList2.ts]
class C {
  F(A?= 0) { }
}

//// [parserParameterList2.js]
"use strict";
class C {
    F(A = 0) { }
}
