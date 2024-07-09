//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName33.ts] ////

//// [parserComputedPropertyName33.ts]
class C {
    // No ASI
    [e] = 0
    [e2]() { }
}

//// [parserComputedPropertyName33.js]
var _a;
class C {
    constructor() {
        // No ASI
        this[_a] = 0[e2]();
    }
}
_a = e;
{ }
