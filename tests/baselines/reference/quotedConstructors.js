//// [quotedConstructors.ts]
class C {
    "constructor"() {
        console.log(this);
    }
}

class D {
    'constructor'() {
        console.log(this);
    }
}

class E {
    ['constructor']() {
        console.log(this);
    }
}

new class {
    "constructor"() {
        console.log(this);
    }
};

var o = { "constructor"() {} };


//// [quotedConstructors.js]
var C = /** @class */ (function () {
    function C() {
        console.log(this);
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
        console.log(this);
    }
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    E.prototype['constructor'] = function () {
        console.log(this);
    };
    return E;
}());
new /** @class */ (function () {
    function class_1() {
        console.log(this);
    }
    return class_1;
}());
var o = { "constructor": function () { } };
