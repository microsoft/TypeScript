//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor7.ts] ////

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

//// [decoratorOnClassAccessor7.js]
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
