//// [propertyParameterWithQuestionMark.ts]
class C {
    constructor(public x?) { }
}

// x should be an optional property
var v: C = {}; // Should succeed
var v2: { x? }
v = v2; // Should succeed
var v3: { x } = new C; // Should fail

//// [propertyParameterWithQuestionMark.js]
var C = /** @class */ (function () {
    function C(x) {
        this.x = x;
    }
    return C;
}());
// x should be an optional property
var v = {}; // Should succeed
var v2;
v = v2; // Should succeed
var v3 = new C; // Should fail
