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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseA = (function () {
    function BaseA(x) {
        this.x = x;
    }
    var proto_1 = BaseA.prototype;
    proto_1.createInstance = function () { new BaseA(1); };
    return BaseA;
}());
var BaseB = (function () {
    function BaseB(x) {
        this.x = x;
    }
    var proto_2 = BaseB.prototype;
    proto_2.createInstance = function () { new BaseB(2); };
    return BaseB;
}());
var BaseC = (function () {
    function BaseC(x) {
        this.x = x;
    }
    var proto_3 = BaseC.prototype;
    proto_3.createInstance = function () { new BaseC(3); };
    BaseC.staticInstance = function () { new BaseC(4); };
    return BaseC;
}());
var DerivedA = (function (_super) {
    __extends(DerivedA, _super);
    function DerivedA(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        return _this;
    }
    var proto_4 = DerivedA.prototype;
    proto_4.createInstance = function () { new DerivedA(5); };
    proto_4.createBaseInstance = function () { new BaseA(6); };
    DerivedA.staticBaseInstance = function () { new BaseA(7); };
    return DerivedA;
}(BaseA));
var DerivedB = (function (_super) {
    __extends(DerivedB, _super);
    function DerivedB(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        return _this;
    }
    var proto_5 = DerivedB.prototype;
    proto_5.createInstance = function () { new DerivedB(7); };
    proto_5.createBaseInstance = function () { new BaseB(8); }; // ok
    DerivedB.staticBaseInstance = function () { new BaseB(9); }; // ok
    return DerivedB;
}(BaseB));
var DerivedC = (function (_super) {
    __extends(DerivedC, _super);
    function DerivedC(x) {
        var _this = _super.call(this, x) || this;
        _this.x = x;
        return _this;
    }
    var proto_6 = DerivedC.prototype;
    proto_6.createInstance = function () { new DerivedC(9); };
    proto_6.createBaseInstance = function () { new BaseC(10); }; // error
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
