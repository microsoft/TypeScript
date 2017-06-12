//// [asiAbstract.ts]
abstract
class NonAbstractClass {
  abstract s();
}

class C2 {
    abstract
    nonAbstractFunction() {
    }
}

class C3 {
    abstract
}


//// [asiAbstract.js]
abstract;
var NonAbstractClass = (function () {
    function NonAbstractClass() {
    }
    return NonAbstractClass;
}());
var C2 = (function () {
    function C2() {
    }
    var proto_1 = C2.prototype;
    proto_1.nonAbstractFunction = function () {
    };
    return C2;
}());
var C3 = (function () {
    function C3() {
    }
    return C3;
}());
