//// [abstractPropertyNegative.ts]
interface A {
    prop: string;
    m(): string;
}
abstract class B implements A {
    abstract prop: string;
    public abstract readonly ro: string;
    abstract get readonlyProp(): string;
    abstract m(): string;
    abstract get mismatch(): string;
    abstract set mismatch(val: number); // error, not same type
}
class C extends B {
    readonly ro = "readonly please";
    abstract notAllowed: string;
    get concreteWithNoBody(): string;
}
let c = new C();
c.ro = "error: lhs of assignment can't be readonly";

abstract class WrongTypeProperty {
    abstract num: number;
}
class WrongTypePropertyImpl extends WrongTypeProperty {
    num = "nope, wrong";
}
abstract class WrongTypeAccessor {
    abstract get num(): number;
}
class WrongTypeAccessorImpl extends WrongTypeAccessor {
    get num() { return "nope, wrong"; }
}
class WrongTypeAccessorImpl2 extends WrongTypeAccessor {
    num = "nope, wrong";
}

abstract class AbstractAccessorMismatch {
    abstract get p1(): string;
    set p1(val: string) { };
    get p2(): string { return "should work"; }
    abstract set p2(val: string);
}


//// [abstractPropertyNegative.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var B = (function () {
    function B() {
    }
    Object.defineProperty(B.prototype, "readonlyProp", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(B.prototype, "mismatch", {
        get: function () { },
        set: function (val) { } // error, not same type
        ,
        enumerable: true,
        configurable: true
    });
    return B;
}());
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
        this.ro = "readonly please";
    }
    Object.defineProperty(C.prototype, "concreteWithNoBody", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return C;
}(B));
var c = new C();
c.ro = "error: lhs of assignment can't be readonly";
var WrongTypeProperty = (function () {
    function WrongTypeProperty() {
    }
    return WrongTypeProperty;
}());
var WrongTypePropertyImpl = (function (_super) {
    __extends(WrongTypePropertyImpl, _super);
    function WrongTypePropertyImpl() {
        _super.apply(this, arguments);
        this.num = "nope, wrong";
    }
    return WrongTypePropertyImpl;
}(WrongTypeProperty));
var WrongTypeAccessor = (function () {
    function WrongTypeAccessor() {
    }
    Object.defineProperty(WrongTypeAccessor.prototype, "num", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
    return WrongTypeAccessor;
}());
var WrongTypeAccessorImpl = (function (_super) {
    __extends(WrongTypeAccessorImpl, _super);
    function WrongTypeAccessorImpl() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(WrongTypeAccessorImpl.prototype, "num", {
        get: function () { return "nope, wrong"; },
        enumerable: true,
        configurable: true
    });
    return WrongTypeAccessorImpl;
}(WrongTypeAccessor));
var WrongTypeAccessorImpl2 = (function (_super) {
    __extends(WrongTypeAccessorImpl2, _super);
    function WrongTypeAccessorImpl2() {
        _super.apply(this, arguments);
        this.num = "nope, wrong";
    }
    return WrongTypeAccessorImpl2;
}(WrongTypeAccessor));
var AbstractAccessorMismatch = (function () {
    function AbstractAccessorMismatch() {
    }
    Object.defineProperty(AbstractAccessorMismatch.prototype, "p1", {
        get: function () { },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(AbstractAccessorMismatch.prototype, "p2", {
        get: function () { return "should work"; },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    return AbstractAccessorMismatch;
}());
