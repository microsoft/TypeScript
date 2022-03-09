//// [optionalMethods.ts]
interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}

function test1(x: Foo) {
    x.a;
    x.b;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
}

class Bar {
    a: number;
    b?: number;
    c? = 2;
    constructor(public d?: number, public e = 10) {}
    f() {
        return 1;
    }
    g?(): number;  // Body of optional method can be omitted
    h?() {
        return 2;
    }
}

function test2(x: Bar) {
    x.a;
    x.b;
    x.c;
    x.d;
    x.e;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
    let h1 = x.h && x.h();
    let h2 = x.h ? x.h() : 0;
}

class Base {
    a?: number;
    f?(): number;
}

class Derived extends Base {
    a = 1;
    f(): number { return 1; }
}


//// [optionalMethods.js]
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
function test1(x) {
    x.a;
    x.b;
    x.f;
    x.g;
    var f1 = x.f();
    var g1 = x.g && x.g();
    var g2 = x.g ? x.g() : 0;
}
var Bar = /** @class */ (function () {
    function Bar(d, e) {
        if (e === void 0) { e = 10; }
        this.d = d;
        this.e = e;
        this.c = 2;
    }
    Bar.prototype.f = function () {
        return 1;
    };
    Bar.prototype.h = function () {
        return 2;
    };
    return Bar;
}());
function test2(x) {
    x.a;
    x.b;
    x.c;
    x.d;
    x.e;
    x.f;
    x.g;
    var f1 = x.f();
    var g1 = x.g && x.g();
    var g2 = x.g ? x.g() : 0;
    var h1 = x.h && x.h();
    var h2 = x.h ? x.h() : 0;
}
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.a = 1;
        return _this;
    }
    Derived.prototype.f = function () { return 1; };
    return Derived;
}(Base));


//// [optionalMethods.d.ts]
interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}
declare function test1(x: Foo): void;
declare class Bar {
    d?: number | undefined;
    e: number;
    a: number;
    b?: number;
    c?: number | undefined;
    constructor(d?: number | undefined, e?: number);
    f(): number;
    g?(): number;
    h?(): number;
}
declare function test2(x: Bar): void;
declare class Base {
    a?: number;
    f?(): number;
}
declare class Derived extends Base {
    a: number;
    f(): number;
}
