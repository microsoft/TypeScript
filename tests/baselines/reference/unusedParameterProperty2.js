//// [tests/cases/compiler/unusedParameterProperty2.ts] ////

//// [unusedParameterProperty2.ts]
class A {
    constructor(private used) {
        let foge = used;
    }
}


//// [unusedParameterProperty2.js]
var A = /** @class */ (function () {
    function A(used) {
        this.used = used;
        var foge = used;
    }
    return A;
}());
