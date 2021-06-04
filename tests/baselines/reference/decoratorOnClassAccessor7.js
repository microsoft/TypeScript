//// [decoratorOnClassAccessor7.ts]
declare function dec1<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;
declare function dec2<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class A {
    @dec1 get x() { return 0; }
    set x(value: number) { }
}

class B {
    get x() { return 0; }
    @dec2 set x(value: number) { }
}

class C {
    @dec1 set x(value: number) { }
    get x() { return 0; }
}

class D {
    set x(value: number) { }
    @dec2 get x() { return 0; }
}

class E {
    @dec1 get x() { return 0; }
    @dec2 set x(value: number) { }
}

class F {
    @dec1 set x(value: number) { }
    @dec2 get x() { return 0; }
}

const A1 = class {
    @dec1 get x() { return 0; }
    set x(value: number) { }
}

const B1 = class {
    get x() { return 0; }
    @dec2 set x(value: number) { }
}

const C1 = class {
    @dec1 set x(value: number) { }
    get x() { return 0; }
}

const D1 = class {
    set x(value: number) { }
    @dec2 get x() { return 0; }
}

const E1 = class {
    @dec1 get x() { return 0; }
    @dec2 set x(value: number) { }
}

const F1 = class {
    @dec1 set x(value: number) { }
    @dec2 get x() { return 0; }
}


//// [decoratorOnClassAccessor7.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e, _f;
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    __decorate([
        dec1
    ], A.prototype, "x", null);
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    __decorate([
        dec2
    ], B.prototype, "x", null);
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    Object.defineProperty(C.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    __decorate([
        dec1
    ], C.prototype, "x", null);
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    Object.defineProperty(D.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    __decorate([
        dec2
    ], D.prototype, "x", null);
    return D;
}());
var E = /** @class */ (function () {
    function E() {
    }
    Object.defineProperty(E.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    __decorate([
        dec1
    ], E.prototype, "x", null);
    return E;
}());
var F = /** @class */ (function () {
    function F() {
    }
    Object.defineProperty(F.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    __decorate([
        dec1
    ], F.prototype, "x", null);
    return F;
}());
var A1 = (_a = /** @class */ (function () {
    function class_1() {
    }
    Object.defineProperty(class_1.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return class_1;
}()), __decorate([
    dec1
], _a.prototype, "x", null), _a);
var B1 = (_b = /** @class */ (function () {
    function class_2() {
    }
    Object.defineProperty(class_2.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return class_2;
}()), __decorate([
    dec2
], _b.prototype, "x", null), _b);
var C1 = (_c = /** @class */ (function () {
    function class_3() {
    }
    Object.defineProperty(class_3.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return class_3;
}()), __decorate([
    dec1
], _c.prototype, "x", null), _c);
var D1 = (_d = /** @class */ (function () {
    function class_4() {
    }
    Object.defineProperty(class_4.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return class_4;
}()), __decorate([
    dec2
], _d.prototype, "x", null), _d);
var E1 = (_e = /** @class */ (function () {
    function class_5() {
    }
    Object.defineProperty(class_5.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return class_5;
}()), __decorate([
    dec1
], _e.prototype, "x", null), _e);
var F1 = (_f = /** @class */ (function () {
    function class_6() {
    }
    Object.defineProperty(class_6.prototype, "x", {
        get: function () { return 0; },
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    return class_6;
}()), __decorate([
    dec1
], _f.prototype, "x", null), _f);
