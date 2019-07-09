//// [quotedConstructors.ts]
class C {
    "constructor"() {} // Error in 3.5
}

class D {
    'constructor'() {} // Error in 3.5
}

class E {
    ['constructor']() {}
}

new class {
    "constructor"() {} // Error in 3.5
};

var o = { "constructor"() {} };


//// [quotedConstructors.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["constructor"] = function () { }; // Error in 3.5
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype['constructor'] = function () { }; // Error in 3.5
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    E.prototype['constructor'] = function () { };
    return E;
}());
new /** @class */ (function () {
    function class_1() {
    }
    class_1.prototype["constructor"] = function () { }; // Error in 3.5
    return class_1;
}());
var o = { "constructor": function () { } };
