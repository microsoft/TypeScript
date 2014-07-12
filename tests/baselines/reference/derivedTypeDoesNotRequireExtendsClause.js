//// [derivedTypeDoesNotRequireExtendsClause.ts]
class Base {
    foo: string;
}

class Derived {
    foo: string;
    bar: number;
}

class Derived2 extends Base {
    bar: string;
}

var b: Base;
var d1: Derived;
var d2: Derived2;
b = d1;
b = d2;

var r: Base[] = [d1, d2];

//// [derivedTypeDoesNotRequireExtendsClause.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();

var Derived = (function () {
    function Derived() {
    }
    return Derived;
})();

var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
})(Base);

var b;
var d1;
var d2;
b = d1;
b = d2;

var r = [d1, d2];
