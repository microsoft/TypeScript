//// [tests/cases/compiler/narrowingOfDottedNames.ts] ////

//// [narrowingOfDottedNames.ts]
// Repro from #8383

class A {
    prop!: { a: string; };
}

class B {
    prop!: { b: string; }
}

function isA(x: any): x is A {
    return x instanceof A;
}

function isB(x: any): x is B {
    return x instanceof B;
}

function f1(x: A | B) {
    while (true) {
        if (x instanceof A) {
            x.prop.a;
        }
        else if (x instanceof B) {
            x.prop.b;
        }
    }
}

function f2(x: A | B) {
    while (true) {
        if (isA(x)) {
            x.prop.a;
        }
        else if (isB(x)) {
            x.prop.b;
        }
    }
}

// Repro from #28100

class Foo1
{
    x: number;  // Error
    constructor() {
        if (this instanceof Boolean) {
        }
    }
}

class Foo2
{
    x: number;  // Error
    constructor() {
    }
}

// Repro from  #29513

class AInfo {
    a_count: number = 1;
}

class BInfo {
    b_count: number = 1;
}

class Base {
    id: number = 0;
}

class A2 extends Base {
    info!: AInfo;
}

class B2 extends Base {
    info!: BInfo;
}

let target: Base = null as any;

while (target) {
    if (target instanceof A2) {
        target.info.a_count = 3;
    }
    else if (target instanceof B2) {
        const j: BInfo = target.info;
    }
}


//// [narrowingOfDottedNames.js]
"use strict";
// Repro from #8383
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
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function isA(x) {
    return x instanceof A;
}
function isB(x) {
    return x instanceof B;
}
function f1(x) {
    while (true) {
        if (x instanceof A) {
            x.prop.a;
        }
        else if (x instanceof B) {
            x.prop.b;
        }
    }
}
function f2(x) {
    while (true) {
        if (isA(x)) {
            x.prop.a;
        }
        else if (isB(x)) {
            x.prop.b;
        }
    }
}
// Repro from #28100
var Foo1 = /** @class */ (function () {
    function Foo1() {
        if (this instanceof Boolean) {
        }
    }
    return Foo1;
}());
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    return Foo2;
}());
// Repro from  #29513
var AInfo = /** @class */ (function () {
    function AInfo() {
        this.a_count = 1;
    }
    return AInfo;
}());
var BInfo = /** @class */ (function () {
    function BInfo() {
        this.b_count = 1;
    }
    return BInfo;
}());
var Base = /** @class */ (function () {
    function Base() {
        this.id = 0;
    }
    return Base;
}());
var A2 = /** @class */ (function (_super) {
    __extends(A2, _super);
    function A2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return A2;
}(Base));
var B2 = /** @class */ (function (_super) {
    __extends(B2, _super);
    function B2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B2;
}(Base));
var target = null;
while (target) {
    if (target instanceof A2) {
        target.info.a_count = 3;
    }
    else if (target instanceof B2) {
        var j = target.info;
    }
}
