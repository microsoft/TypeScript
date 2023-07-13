//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName28.ts] ////

//// [parserComputedPropertyName28.ts]
class C {
    [e]: number = 0;
    [e2]: number
}

//// [parserComputedPropertyName28.js]
var _a;
class C {
    constructor() {
        this[_a] = 0;
    }
}
_a = e;
