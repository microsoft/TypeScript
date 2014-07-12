//// [typeAssertions.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Function call whose argument is a 1 arg generic function call with explicit type arguments
function fn1(t) {
}
function fn2(t) {
}

fn1(fn2(4)); // Error

var a;
var s;

// Type assertion of non - unary expression
var a = "" + 4;
var s = "" + 4;

var SomeBase = (function () {
    function SomeBase() {
    }
    return SomeBase;
})();
var SomeDerived = (function (_super) {
    __extends(SomeDerived, _super);
    function SomeDerived() {
        _super.apply(this, arguments);
    }
    return SomeDerived;
})(SomeBase);
var SomeOther = (function () {
    function SomeOther() {
    }
    return SomeOther;
})();

// Type assertion should check for assignability in either direction
var someBase = new SomeBase();
var someDerived = new SomeDerived();
var someOther = new SomeOther();

someBase = someDerived;
someBase = someBase;
someBase = someOther; // Error

someDerived = someDerived;
someDerived = someBase;
someDerived = someOther; // Error

someOther = someDerived; // Error
someOther = someBase; // Error
someOther = someOther;
