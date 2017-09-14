//// [implementsClauseAlreadySeen.ts]
class C {
    
}
class D implements C implements C {
    baz() { }
}

//// [implementsClauseAlreadySeen.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.baz = function () { };
    return D;
}());
