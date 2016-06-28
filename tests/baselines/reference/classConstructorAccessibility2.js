//// [classConstructorAccessibility2.ts]

class BaseA {
    public constructor(public x: number) { }
    createInstance() { new BaseA(1); }
}

class BaseB {
    protected constructor(public x: number) { }
    createInstance() { new BaseB(1); }
}

class BaseC {
     private constructor(public x: number) { }
     createInstance() { new BaseC(1); }
}

class DerivedA extends BaseA {
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedA(1); }
    createBaseInstance() { new BaseA(1); }
}

class DerivedB extends BaseB {
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedB(1); }
    createBaseInstance() { new BaseB(1); } // error
}

class DerivedC extends BaseC { // error
    constructor(public x: number) { super(x); }
    createInstance() { new DerivedC(1); }
    createBaseInstance() { new BaseC(1); } // error
}

var ba = new BaseA(1);
var bb = new BaseB(1); // error
var bc = new BaseC(1); // error

var da = new DerivedA(1);
var db = new DerivedB(1);
var dc = new DerivedC(1);

//// [classConstructorAccessibility2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseA = (function () {
    function BaseA(x) {
        this.x = x;
    }
    BaseA.prototype.createInstance = function () { new BaseA(1); };
    return BaseA;
}());
var BaseB = (function () {
    function BaseB(x) {
        this.x = x;
    }
    BaseB.prototype.createInstance = function () { new BaseB(1); };
    return BaseB;
}());
var BaseC = (function () {
    function BaseC(x) {
        this.x = x;
    }
    BaseC.prototype.createInstance = function () { new BaseC(1); };
    return BaseC;
}());
var DerivedA = (function (_super) {
    __extends(DerivedA, _super);
    function DerivedA(x) {
        _super.call(this, x);
        this.x = x;
    }
    DerivedA.prototype.createInstance = function () { new DerivedA(1); };
    DerivedA.prototype.createBaseInstance = function () { new BaseA(1); };
    return DerivedA;
}(BaseA));
var DerivedB = (function (_super) {
    __extends(DerivedB, _super);
    function DerivedB(x) {
        _super.call(this, x);
        this.x = x;
    }
    DerivedB.prototype.createInstance = function () { new DerivedB(1); };
    DerivedB.prototype.createBaseInstance = function () { new BaseB(1); }; // error
    return DerivedB;
}(BaseB));
var DerivedC = (function (_super) {
    __extends(DerivedC, _super);
    function DerivedC(x) {
        _super.call(this, x);
        this.x = x;
    }
    DerivedC.prototype.createInstance = function () { new DerivedC(1); };
    DerivedC.prototype.createBaseInstance = function () { new BaseC(1); }; // error
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
    private constructor(x);
    createInstance(): void;
}
declare class DerivedA extends BaseA {
    x: number;
    constructor(x: number);
    createInstance(): void;
    createBaseInstance(): void;
}
declare class DerivedB extends BaseB {
    x: number;
    constructor(x: number);
    createInstance(): void;
    createBaseInstance(): void;
}
declare class DerivedC extends BaseC {
    x: number;
    constructor(x: number);
    createInstance(): void;
    createBaseInstance(): void;
}
declare var ba: BaseA;
declare var bb: any;
declare var bc: any;
declare var da: DerivedA;
declare var db: DerivedB;
declare var dc: DerivedC;
