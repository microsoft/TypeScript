//// [tests/cases/conformance/classes/constructorDeclarations/automaticConstructors/derivedClassWithoutExplicitConstructor3.ts] ////

//// [derivedClassWithoutExplicitConstructor3.ts]
// automatic constructors with a class hieararchy of depth > 2

class Base {
    a = 1;
    constructor(x: number) { this.a = x; }
}

class Derived extends Base {
    b = '';
    constructor(y: string, z: string) {
        super(2);
        this.b = y;
    }
}

class Derived2 extends Derived {
    x = 1
    y = 'hello';
}

var r = new Derived(); // error
var r2 = new Derived2(1); // error
var r3 = new Derived('', '');

class Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

class D<T> extends Base {
    b: T = null;
    constructor(y: T, z: T) {
        super(2);
        this.b = y;
    }
}


class D2<T extends Date> extends D<T> {
    x = 2
    y: T = null;
}

var d = new D2(); // error
var d2 = new D2(new Date()); // error
var d3 = new D2(new Date(), new Date()); // ok

//// [derivedClassWithoutExplicitConstructor3.js]
// automatic constructors with a class hieararchy of depth > 2
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
    function Derived(y, z) {
        var _this = _super.call(this, 2) || this;
        _this.b = '';
        _this.b = y;
        return _this;
    }
    return Derived;
}(Base));
var Derived2 = /** @class */ (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 1;
        _this.y = 'hello';
        return _this;
    }
    return Derived2;
}(Derived));
var r = new Derived(); // error
var r2 = new Derived2(1); // error
var r3 = new Derived('', '');
var Base2 = /** @class */ (function () {
    function Base2(x) {
        this.a = x;
    }
    return Base2;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D(y, z) {
        var _this = _super.call(this, 2) || this;
        _this.b = null;
        _this.b = y;
        return _this;
    }
    return D;
}(Base));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 2;
        _this.y = null;
        return _this;
    }
    return D2;
}(D));
var d = new D2(); // error
var d2 = new D2(new Date()); // error
var d3 = new D2(new Date(), new Date()); // ok
