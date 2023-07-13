//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName27.ts] ////

//// [parserComputedPropertyName27.ts]
class C {
    // No ASI
    [e]: number = 0
    [e2]: number
}

//// [parserComputedPropertyName27.js]
var _a;
class C {
    constructor() {
        // No ASI
        this[_a] = 0[e2];
    }
}
_a = e;
