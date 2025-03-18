//// [tests/cases/compiler/propertyParameterWithQuestionMark.ts] ////

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
class C {
    x;
    constructor(x) {
        this.x = x;
    }
}
var v = {};
var v2;
v = v2;
var v3 = new C;
