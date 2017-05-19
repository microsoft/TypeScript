//// [implementsClauseAlreadySeen.ts]
class C {
    
}
class D implements C implements C {
    baz() { }
}

//// [implementsClauseAlreadySeen.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var D = (function () {
    function D() {
    }
    D.prototype.baz = function () { };
    return D;
}());
