//// [tests/cases/compiler/accessorAccidentalCallDiagnostic.ts] ////

//// [accessorAccidentalCallDiagnostic.ts]
// https://github.com/microsoft/TypeScript/issues/24554
class Test24554 {
    get property(): number { return 1; }
}
function test24554(x: Test24554) {
    return x.property();
}


//// [accessorAccidentalCallDiagnostic.js]
// https://github.com/microsoft/TypeScript/issues/24554
var Test24554 = /** @class */ (function () {
    function Test24554() {
    }
    Object.defineProperty(Test24554.prototype, "property", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return Test24554;
}());
function test24554(x) {
    return x.property();
}
