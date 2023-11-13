//// [tests/cases/conformance/expressions/functionCalls/callWithSpread.ts] ////

//// [callWithSpread.ts]
interface X {
    foo(x: number, y: number, ...z: string[]): X;
}

function foo(x: number, y: number, ...z: string[]) {
}

var a: string[];
var z: number[];
var obj: X;
var xa: X[];

foo(1, 2, "abc");
foo(1, 2, ...a);
foo(1, 2, ...a, "abc");

obj.foo(1, 2, "abc");
obj.foo(1, 2, ...a);
obj.foo(1, 2, ...a, "abc");

obj.foo(1, 2, ...a).foo(1, 2, "abc");
obj.foo(1, 2, ...a).foo(1, 2, ...a);
obj.foo(1, 2, ...a).foo(1, 2, ...a, "abc");

(obj.foo)(1, 2, "abc");
(obj.foo)(1, 2, ...a);
(obj.foo)(1, 2, ...a, "abc");

((obj.foo)(1, 2, ...a).foo)(1, 2, "abc");
((obj.foo)(1, 2, ...a).foo)(1, 2, ...a);
((obj.foo)(1, 2, ...a).foo)(1, 2, ...a, "abc");

xa[1].foo(1, 2, "abc");
xa[1].foo(1, 2, ...a);
xa[1].foo(1, 2, ...a, "abc");

(<Function>xa[1].foo)(...[1, 2, "abc"]);

class C {
    constructor(x: number, y: number, ...z: string[]) {
        this.foo(x, y);
        this.foo(x, y, ...z);
    }
    foo(x: number, y: number, ...z: string[]) {
    }
}

class D extends C {
    constructor() {
        super(1, 2);
        super(1, 2, ...a);
    }
    foo() {
        super.foo(1, 2);
        super.foo(1, 2, ...a);
    }
}


//// [callWithSpread.js]
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b, _c, _d, _e, _f, _g;
function foo(x, y) {
    var z = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        z[_i - 2] = arguments[_i];
    }
}
var a;
var z;
var obj;
var xa;
foo(1, 2, "abc");
foo.apply(void 0, __spreadArray([1, 2], a, false));
foo.apply(void 0, __spreadArray(__spreadArray([1, 2], a, false), ["abc"], false));
obj.foo(1, 2, "abc");
obj.foo.apply(obj, __spreadArray([1, 2], a, false));
obj.foo.apply(obj, __spreadArray(__spreadArray([1, 2], a, false), ["abc"], false));
obj.foo.apply(obj, __spreadArray([1, 2], a, false)).foo(1, 2, "abc");
(_a = obj.foo.apply(obj, __spreadArray([1, 2], a, false))).foo.apply(_a, __spreadArray([1, 2], a, false));
(_b = obj.foo.apply(obj, __spreadArray([1, 2], a, false))).foo.apply(_b, __spreadArray(__spreadArray([1, 2], a, false), ["abc"], false));
(obj.foo)(1, 2, "abc");
obj.foo.apply(obj, __spreadArray([1, 2], a, false));
obj.foo.apply(obj, __spreadArray(__spreadArray([1, 2], a, false), ["abc"], false));
(obj.foo.apply(obj, __spreadArray([1, 2], a, false)).foo)(1, 2, "abc");
(_c = obj.foo.apply(obj, __spreadArray([1, 2], a, false))).foo.apply(_c, __spreadArray([1, 2], a, false));
(_d = obj.foo.apply(obj, __spreadArray([1, 2], a, false))).foo.apply(_d, __spreadArray(__spreadArray([1, 2], a, false), ["abc"], false));
xa[1].foo(1, 2, "abc");
(_e = xa[1]).foo.apply(_e, __spreadArray([1, 2], a, false));
(_f = xa[1]).foo.apply(_f, __spreadArray(__spreadArray([1, 2], a, false), ["abc"], false));
(_g = xa[1]).foo.apply(_g, [1, 2, "abc"]);
var C = /** @class */ (function () {
    function C(x, y) {
        var z = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            z[_i - 2] = arguments[_i];
        }
        this.foo(x, y);
        this.foo.apply(this, __spreadArray([x, y], z, false));
    }
    C.prototype.foo = function (x, y) {
        var z = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            z[_i - 2] = arguments[_i];
        }
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super.call(this, 1, 2) || this;
        return _super.apply(this, __spreadArray([1, 2], a, false)) || this;
    }
    D.prototype.foo = function () {
        _super.prototype.foo.call(this, 1, 2);
        _super.prototype.foo.apply(this, __spreadArray([1, 2], a, false));
    };
    return D;
}(C));
