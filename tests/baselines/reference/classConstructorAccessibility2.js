//// [classConstructorAccessibility2.ts]
class BaseA {
    public constructor(public x: number) { }
    createInstance() { new BaseA(1); }
}

class BaseB {
    protected constructor(public x: number) { }
    createInstance() { new BaseB(2); }
}

class BaseC {
    private constructor(public x: number) { }
    createInstance() { new BaseC(3); }
    static staticInstance() { new BaseC(4); }
}

class DerivedA extends BaseA {
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedA(5); }
    createBaseInstance() { new BaseA(6); }
    static staticBaseInstance() { new BaseA(7); }
}

class DerivedB extends BaseB {
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedB(7); }
    createBaseInstance() { new BaseB(8); } // ok
    static staticBaseInstance() { new BaseB(9); } // ok
}

class DerivedC extends BaseC { // error
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedC(9); }
    createBaseInstance() { new BaseC(10); } // error
    static staticBaseInstance() { new BaseC(11); } // error
}

var ba = new BaseA(1);
var bb = new BaseB(1); // error
var bc = new BaseC(1); // error

var da = new DerivedA(1);
var db = new DerivedB(1);
var dc = new DerivedC(1);


//// [classConstructorAccessibility2.js]
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
var BaseA = /** @class */ (function () {
    function BaseA(x) {
        this.x = x;
    }
    BaseA.prototype.createInstance = function () { new BaseA(1); };
    return BaseA;
}());
var BaseB = /** @class */ (function () {
    function BaseB(x) {
        this.x = x;
    }
    BaseB.prototype.createInstance = function () { new BaseB(2); };
    return BaseB;
}());
var BaseC = /** @class */ (function () {
    function BaseC(x) {
        this.x = x;
    }
    BaseC.prototype.createInstance = function () { new BaseC(3); };
    BaseC.staticInstance = function () { new BaseC(4); };
    return BaseC;
}());
var DerivedA = /** @class */ (function (_super) {
    __extends(DerivedA, _super);
    function DerivedA(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        return _this;
    }
    DerivedA.prototype.createInstance = function () { new DerivedA(5); };
    DerivedA.prototype.createBaseInstance = function () { new BaseA(6); };
    DerivedA.staticBaseInstance = function () { new BaseA(7); };
    return DerivedA;
}(BaseA));
var DerivedB = /** @class */ (function (_super) {
    __extends(DerivedB, _super);
    function DerivedB(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        return _this;
    }
    DerivedB.prototype.createInstance = function () { new DerivedB(7); };
    DerivedB.prototype.createBaseInstance = function () { new BaseB(8); }; // ok
    DerivedB.staticBaseInstance = function () { new BaseB(9); }; // ok
    return DerivedB;
}(BaseB));
var DerivedC = /** @class */ (function (_super) {
    __extends(DerivedC, _super);
    function DerivedC(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        return _this;
    }
    DerivedC.prototype.createInstance = function () { new DerivedC(9); };
    DerivedC.prototype.createBaseInstance = function () { new BaseC(10); }; // error
    DerivedC.staticBaseInstance = function () { new BaseC(11); }; // error
    return DerivedC;
}(BaseC));
var ba = new BaseA(1);
var bb = new BaseB(1); // error
var bc = new BaseC(1); // error
var da = new DerivedA(1);
var db = new DerivedB(1);
var dc = new DerivedC(1);


//// [classConstructorAccessibility2.d.ts]
declare class BaseA {
    x: number;
    constructor(x: number);
    createInstance(): void;
}
declare class BaseB {
    x: number;
    protected constructor(x: number);
    createInstance(): void;
}
declare class BaseC {
    x: number;
    private constructor();
    createInstance(): void;
    static staticInstance(): void;
}
declare class DerivedA extends BaseA {
    x: number;
    constructor(x: number);
    createInstance(): void;
    createBaseInstance(): void;
    static staticBaseInstance(): void;
}
declare class DerivedB extends BaseB {
    x: number;
    constructor(x: number);
    createInstance(): void;
    createBaseInstance(): void;
    static staticBaseInstance(): void;
}
declare class DerivedC extends BaseC {
    x: number;
    constructor(x: number);
    createInstance(): void;
    createBaseInstance(): void;
    static staticBaseInstance(): void;
}
declare var ba: BaseA;
declare var bb: any;
declare var bc: any;
declare var da: DerivedA;
declare var db: DerivedB;
declare var dc: DerivedC;
