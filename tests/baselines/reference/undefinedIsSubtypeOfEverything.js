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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var D0 = /** @class */ (function (_super) {
    __extends(D0, _super);
    function D0() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D0;
}(Base));
var DA = /** @class */ (function (_super) {
    __extends(DA, _super);
    function DA() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DA;
}(Base));
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1;
}(Base));
var D1A = /** @class */ (function (_super) {
    __extends(D1A, _super);
    function D1A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D1A;
}(Base));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2;
}(Base));
var D2A = /** @class */ (function (_super) {
    __extends(D2A, _super);
    function D2A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D2A;
}(Base));
var D3 = /** @class */ (function (_super) {
    __extends(D3, _super);
    function D3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D3;
}(Base));
var D3A = /** @class */ (function (_super) {
    __extends(D3A, _super);
    function D3A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D3A;
}(Base));
var D4 = /** @class */ (function (_super) {
    __extends(D4, _super);
    function D4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D4;
}(Base));
var D5 = /** @class */ (function (_super) {
    __extends(D5, _super);
    function D5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D5;
}(Base));
var D6 = /** @class */ (function (_super) {
    __extends(D6, _super);
    function D6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D6;
}(Base));
var D7 = /** @class */ (function (_super) {
    __extends(D7, _super);
    function D7() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D7;
}(Base));
var D8 = /** @class */ (function (_super) {
    __extends(D8, _super);
    function D8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D8;
}(Base));
var D9 = /** @class */ (function (_super) {
    __extends(D9, _super);
    function D9() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D9;
}(Base));
var D10 = /** @class */ (function (_super) {
    __extends(D10, _super);
    function D10() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D10;
}(Base));
var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));
var D11 = /** @class */ (function (_super) {
    __extends(D11, _super);
    function D11() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D11;
}(Base));
function f() { }
(function (f) {
    f.bar = 1;
})(f || (f = {}));
var D12 = /** @class */ (function (_super) {
    __extends(D12, _super);
    function D12() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D12;
}(Base));
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
(function (c) {
    c.bar = 1;
})(c || (c = {}));
var D13 = /** @class */ (function (_super) {
    __extends(D13, _super);
    function D13() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D13;
}(Base));
var D14 = /** @class */ (function (_super) {
    __extends(D14, _super);
    function D14() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D14;
}(Base));
var D15 = /** @class */ (function (_super) {
    __extends(D15, _super);
    function D15() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D15;
}(Base));
//class D15<T, U extends T> extends Base {
//    foo: U;
//}
var D16 = /** @class */ (function (_super) {
    __extends(D16, _super);
    function D16() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D16;
}(Base));
var D17 = /** @class */ (function (_super) {
    __extends(D17, _super);
    function D17() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D17;
}(Base));
