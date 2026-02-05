//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName33.ts] ////

//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

//// [parserComputedPropertyName33.js]
"use strict";
class C {
    // No ASI
    [e] = 0[e2]();
}
{ }
