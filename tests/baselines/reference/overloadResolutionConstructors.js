//// [overloadResolutionConstructors.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SomeBase = (function () {
    function SomeBase() {
    }
    return SomeBase;
})();
var SomeDerived1 = (function (_super) {
    __extends(SomeDerived1, _super);
    function SomeDerived1() {
        _super.apply(this, arguments);
    }
    return SomeDerived1;
})(SomeBase);
var SomeDerived2 = (function (_super) {
    __extends(SomeDerived2, _super);
    function SomeDerived2() {
        _super.apply(this, arguments);
    }
    return SomeDerived2;
})(SomeBase);
var SomeDerived3 = (function (_super) {
    __extends(SomeDerived3, _super);
    function SomeDerived3() {
        _super.apply(this, arguments);
    }
    return SomeDerived3;
})(SomeBase);

var fn1;

// Ambiguous call picks the first overload in declaration order
var s = new fn1(undefined);
var s;

// No candidate overloads found
new fn1({}); // Error

var fn2;

var d = new fn2(0, undefined);
var d;

// Generic and non - generic overload where generic overload is the only candidate when called without type arguments
var s = new fn2(0, '');

// Generic and non - generic overload where non - generic overload is the only candidate when called with type arguments
new fn2('', 0); // Error

// Generic and non - generic overload where non - generic overload is the only candidate when called without type arguments
new fn2('', 0); // OK

var fn3;

var s = new fn3(3);
var s = new fn3('', 3, '');
var n = new fn3(5, 5, 5);
var n;

// Generic overloads with differing arity called with type arguments matching each overload type parameter count
var s = new fn3(4);
var s = new fn3('', '', '');
var n = new fn3('', '', 3);

// Generic overloads with differing arity called with type argument count that doesn't match any overload
new fn3(); // Error

var fn4;

new fn4('', 3);
new fn4(3, ''); // Error
new fn4('', 3); // Error
new fn4(3, '');

// Generic overloads with constraints called without type arguments but with types that satisfy the constraints
new fn4('', 3);
new fn4(3, '');
new fn4(3, undefined);
new fn4('', null);

// Generic overloads with constraints called with type arguments that do not satisfy the constraints
new fn4(null, null); // Error

// Generic overloads with constraints called without type arguments but with types that do not satisfy the constraints
new fn4(true, null); // Error
new fn4(null, true); // Error

var fn5;
var n = new fn5(function (n) {
    return n.toFixed();
});
var s = new fn5(function (n) {
    return n.substr(0);
});
