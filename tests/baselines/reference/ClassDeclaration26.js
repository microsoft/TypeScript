//// [ClassDeclaration26.ts]
class C {
    public const var export foo = 10;

    var constructor() { }
}

//// [ClassDeclaration26.js]
var C = /** @class */ (function () {
    function C() {
        this.foo = 10;
    }
    return C;
}());
var constructor;
(function () { });
