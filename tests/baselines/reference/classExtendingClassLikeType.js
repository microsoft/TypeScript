//// [classExtendingClassLikeType.ts]
interface Base<T, U> {
    x: T;
    y: U;
}

// Error, no Base constructor function
class D0 extends Base<string, string> {
}

interface BaseConstructor {
    new (x: string, y: string): Base<string, string>;
    new <T>(x: T): Base<T, T>;
    new <T>(x: T, y: T): Base<T, T>;
    new <T, U>(x: T, y: U): Base<T, U>;
}

declare function getBase(): BaseConstructor;

class D1 extends getBase() {
    constructor() {
        super("abc", "def");
        this.x = "x";
        this.y = "y";
    }
}

class D2 extends getBase() <number> {
    constructor() {
        super(10);
        super(10, 20);
        this.x = 1;
        this.y = 2;
    }
}

class D3 extends getBase() <string, number> {
    constructor() {
        super("abc", 42);
        this.x = "x";
        this.y = 2;
    }
}

// Error, no constructors with three type arguments
class D4 extends getBase() <string, string, string> {
}

interface BadBaseConstructor {
    new (x: string): Base<string, string>;
    new (x: number): Base<number, number>;
}

declare function getBadBase(): BadBaseConstructor;

// Error, constructor return types differ
class D5 extends getBadBase() {
}


//// [classExtendingClassLikeType.js]
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
// Error, no Base constructor function
var D0 = /** @class */ (function (_super) {
    __extends(D0, _super);
    function D0() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D0;
}(Base));
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        var _this = _super.call(this, "abc", "def") || this;
        _this.x = "x";
        _this.y = "y";
        return _this;
    }
    return D1;
}(getBase()));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        var _this = _super.call(this, 10) || this;
        _this = _super.call(this, 10, 20) || this;
        _this.x = 1;
        _this.y = 2;
        return _this;
    }
    return D2;
}(getBase()));
var D3 = /** @class */ (function (_super) {
    __extends(D3, _super);
    function D3() {
        var _this = _super.call(this, "abc", 42) || this;
        _this.x = "x";
        _this.y = 2;
        return _this;
    }
    return D3;
}(getBase()));
// Error, no constructors with three type arguments
var D4 = /** @class */ (function (_super) {
    __extends(D4, _super);
    function D4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D4;
}(getBase()));
// Error, constructor return types differ
var D5 = /** @class */ (function (_super) {
    __extends(D5, _super);
    function D5() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D5;
}(getBadBase()));
