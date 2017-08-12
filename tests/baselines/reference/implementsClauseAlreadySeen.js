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
    var proto_1 = D.prototype;
    proto_1.baz = function () { };
    return D;
}());
