//// [unusedParameterProperty1.ts]
class A {
    constructor(private used: string) {
        let foge = used;
        foge += "";
    }
}


//// [unusedParameterProperty1.js]
var A = /** @class */ (function () {
    function A(used) {
        this.used = used;
        var foge = used;
        foge += "";
    }
    return A;
}());
