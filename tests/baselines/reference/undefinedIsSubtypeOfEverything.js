//// [undefinedIsSubtypeOfEverything.ts]
// undefined is a subtype of every other types, no errors expected below

class Base {
    foo: typeof undefined;
} 

class D0 extends Base {
    foo: any;
}

class DA extends Base {
    foo: typeof undefined; 
}

class D1 extends Base {
    foo: string;
}

class D1A extends Base {
    foo: String;
}


class D2 extends Base {
    foo: number;
}

class D2A extends Base {
    foo: Number;
}


class D3 extends Base {
    foo: boolean;
}

class D3A extends Base {
    foo: Boolean;
}


class D4 extends Base {
    foo: RegExp;
}

class D5 extends Base {
    foo: Date;
}


class D6 extends Base {
    foo: number[];
}

class D7 extends Base {
    foo: { bar: number };
}


class D8 extends Base {
    foo: D7;
}

interface I1 {
    bar: string;
}
class D9 extends Base {
    foo: I1;
}


class D10 extends Base {
    foo: () => number;
}

enum E { A }
class D11 extends Base {
    foo: E;
}

function f() { }
module f {
    export var bar = 1;
}
class D12 extends Base {
    foo: typeof f;
}


class c { baz: string }
module c {
    export var bar = 1;
}
class D13 extends Base {
    foo: typeof c;
}


class D14<T> extends Base {
    foo: T;
}


class D15<T, U> extends Base {
    foo: U;
}

//class D15<T, U extends T> extends Base {
//    foo: U;
//}


class D16 extends Base {
    foo: Object;
}


class D17 extends Base {
    foo: {};
}


//// [undefinedIsSubtypeOfEverything.js]
// undefined is a subtype of every other types, no errors expected below
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

var D0 = (function (_super) {
    __extends(D0, _super);
    function D0() {
        _super.apply(this, arguments);
    }
    return D0;
})(Base);

var DA = (function (_super) {
    __extends(DA, _super);
    function DA() {
        _super.apply(this, arguments);
    }
    return DA;
})(Base);

var D1 = (function (_super) {
    __extends(D1, _super);
    function D1() {
        _super.apply(this, arguments);
    }
    return D1;
})(Base);

var D1A = (function (_super) {
    __extends(D1A, _super);
    function D1A() {
        _super.apply(this, arguments);
    }
    return D1A;
})(Base);

var D2 = (function (_super) {
    __extends(D2, _super);
    function D2() {
        _super.apply(this, arguments);
    }
    return D2;
})(Base);

var D2A = (function (_super) {
    __extends(D2A, _super);
    function D2A() {
        _super.apply(this, arguments);
    }
    return D2A;
})(Base);

var D3 = (function (_super) {
    __extends(D3, _super);
    function D3() {
        _super.apply(this, arguments);
    }
    return D3;
})(Base);

var D3A = (function (_super) {
    __extends(D3A, _super);
    function D3A() {
        _super.apply(this, arguments);
    }
    return D3A;
})(Base);

var D4 = (function (_super) {
    __extends(D4, _super);
    function D4() {
        _super.apply(this, arguments);
    }
    return D4;
})(Base);

var D5 = (function (_super) {
    __extends(D5, _super);
    function D5() {
        _super.apply(this, arguments);
    }
    return D5;
})(Base);

var D6 = (function (_super) {
    __extends(D6, _super);
    function D6() {
        _super.apply(this, arguments);
    }
    return D6;
})(Base);

var D7 = (function (_super) {
    __extends(D7, _super);
    function D7() {
        _super.apply(this, arguments);
    }
    return D7;
})(Base);

var D8 = (function (_super) {
    __extends(D8, _super);
    function D8() {
        _super.apply(this, arguments);
    }
    return D8;
})(Base);

var D9 = (function (_super) {
    __extends(D9, _super);
    function D9() {
        _super.apply(this, arguments);
    }
    return D9;
})(Base);

var D10 = (function (_super) {
    __extends(D10, _super);
    function D10() {
        _super.apply(this, arguments);
    }
    return D10;
})(Base);

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var D11 = (function (_super) {
    __extends(D11, _super);
    function D11() {
        _super.apply(this, arguments);
    }
    return D11;
})(Base);

function f() {
}
var f;
(function (f) {
    f.bar = 1;
})(f || (f = {}));
var D12 = (function (_super) {
    __extends(D12, _super);
    function D12() {
        _super.apply(this, arguments);
    }
    return D12;
})(Base);

var c = (function () {
    function c() {
    }
    return c;
})();
var c;
(function (c) {
    c.bar = 1;
})(c || (c = {}));
var D13 = (function (_super) {
    __extends(D13, _super);
    function D13() {
        _super.apply(this, arguments);
    }
    return D13;
})(Base);

var D14 = (function (_super) {
    __extends(D14, _super);
    function D14() {
        _super.apply(this, arguments);
    }
    return D14;
})(Base);

var D15 = (function (_super) {
    __extends(D15, _super);
    function D15() {
        _super.apply(this, arguments);
    }
    return D15;
})(Base);

//class D15<T, U extends T> extends Base {
//    foo: U;
//}
var D16 = (function (_super) {
    __extends(D16, _super);
    function D16() {
        _super.apply(this, arguments);
    }
    return D16;
})(Base);

var D17 = (function (_super) {
    __extends(D17, _super);
    function D17() {
        _super.apply(this, arguments);
    }
    return D17;
})(Base);
