//// [tests/cases/conformance/classes/constructorDeclarations/automaticConstructors/derivedClassWithoutExplicitConstructor2.ts] ////

//// [derivedClassWithoutExplicitConstructor2.ts]
class Base {
    a = 1;
    constructor(x: number, y?: number, z?: number);
    constructor(x: number, y?: number);
    constructor(x: number) { this.a = x; }
}

class Derived extends Base {
    x = 1
    y = 'hello';
}

var r = new Derived(); // error
var r2 = new Derived(1); 
var r3 = new Derived(1, 2);
var r4 = new Derived(1, 2, 3);

class Base2<T> {
    a: T;
    constructor(x: T, y?: T, z?: T);
    constructor(x: T, y?: T);
    constructor(x: T) { this.a = x; }
}

class D<T extends Date> extends Base2<T> {
    x = 2
    y: T = null;
}

var d = new D(); // error
var d2 = new D(new Date()); // ok
var d3 = new D(new Date(), new Date());
var d4 = new D(new Date(), new Date(), new Date());

//// [derivedClassWithoutExplicitConstructor2.js]
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
    function Base(x) {
        this.a = 1;
        this.a = x;
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 1;
        _this.y = 'hello';
        return _this;
    }
    return Derived;
}(Base));
var r = new Derived(); // error
var r2 = new Derived(1);
var r3 = new Derived(1, 2);
var r4 = new Derived(1, 2, 3);
var Base2 = /** @class */ (function () {
    function Base2(x) {
        this.a = x;
    }
    return Base2;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 2;
        _this.y = null;
        return _this;
    }
    return D;
}(Base2));
var d = new D(); // error
var d2 = new D(new Date()); // ok
var d3 = new D(new Date(), new Date());
var d4 = new D(new Date(), new Date(), new Date());
