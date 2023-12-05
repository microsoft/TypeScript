//// [tests/cases/compiler/initializerWithThisPropertyAccess.ts] ////

//// [initializerWithThisPropertyAccess.ts]
class A {
    a: number;
    b = this.a;  // Error
    c = () => this.a;
    d = (new A()).a;
    constructor() {
        this.a = 1;
    }
}

class B extends A {
    x = this.a;
}

class C {
    a!: number;
    b = this.a;
}

// Repro from #37979

class Foo {
    private bar: Bar;
    readonly barProp = this.bar.prop;
    constructor() {
        this.bar = new Bar();
    }
}

class Bar {
    readonly prop = false;
}


//// [initializerWithThisPropertyAccess.js]
"use strict";
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
var A = /** @class */ (function () {
    function A() {
        var _this = this;
        this.b = this.a; // Error
        this.c = function () { return _this.a; };
        this.d = (new A()).a;
        this.a = 1;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = _this.a;
        return _this;
    }
    return B;
}(A));
var C = /** @class */ (function () {
    function C() {
        this.b = this.a;
    }
    return C;
}());
// Repro from #37979
var Foo = /** @class */ (function () {
    function Foo() {
        this.barProp = this.bar.prop;
        this.bar = new Bar();
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
        this.prop = false;
    }
    return Bar;
}());


//// [initializerWithThisPropertyAccess.d.ts]
declare class A {
    a: number;
    b: number;
    c: () => number;
    d: number;
    constructor();
}
declare class B extends A {
    x: number;
}
declare class C {
    a: number;
    b: number;
}
declare class Foo {
    private bar;
    readonly barProp = false;
    constructor();
}
declare class Bar {
    readonly prop = false;
}
