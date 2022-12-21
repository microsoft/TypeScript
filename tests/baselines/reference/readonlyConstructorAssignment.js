//// [readonlyConstructorAssignment.ts]
// Tests that readonly parameter properties behave like regular readonly properties

class A {
    constructor(readonly x: number) {
        this.x = 0;
    }
}

class B extends A {
    constructor(x: number) {
        super(x);
        // Fails, x is readonly
        this.x = 1;
    }
}

class C extends A {
    // This is the usual behavior of readonly properties:
    // if one is redeclared in a base class, then it can be assigned to.
    constructor(readonly x: number) {
        super(x);
        this.x = 1;
    }
}

class D {
    constructor(private readonly x: number) {
        this.x = 0;
    }
}

// Fails, can't redeclare readonly property
class E extends D {
    constructor(readonly x: number) {
        super(x);
        this.x = 1;
    }
}


//// [readonlyConstructorAssignment.js]
// Tests that readonly parameter properties behave like regular readonly properties
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
    function A(x) {
        this.x = x;
        this.x = 0;
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B(x) {
        var _this = _super.call(this, x) || this;
        // Fails, x is readonly
        _this.x = 1;
        return _this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    // This is the usual behavior of readonly properties:
    // if one is redeclared in a base class, then it can be assigned to.
    function C(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        _this.x = 1;
        return _this;
    }
    return C;
}(A));
var D = /** @class */ (function () {
    function D(x) {
        this.x = x;
        this.x = 0;
    }
    return D;
}());
// Fails, can't redeclare readonly property
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        _this.x = 1;
        return _this;
    }
    return E;
}(D));
