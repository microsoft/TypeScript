//// [derivedClassSuperCallsWithThisArg.ts]
class Base {
    x: string;
    constructor(a) { }
}

class Derived extends Base {
    constructor() {
        super(this); // ok
    }
}

class Derived2 extends Base {
    constructor(public a: string) {
        super(this); // error
    }
}

class Derived3 extends Base {
    constructor(public a: string) {
        super(() => this); // error
    }
}

class Derived4 extends Base {
    constructor(public a: string) {
        super(function () { return this; }); // ok
    }
}

//// [derivedClassSuperCallsWithThisArg.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base(a) {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        _super.call(this, this); // ok
    }
    return Derived;
}(Base));
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2(a) {
        _super.call(this, this); // error
        this.a = a;
    }
    return Derived2;
}(Base));
var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3(a) {
        var _this = this;
        _super.call(this, function () { return _this; }); // error
        this.a = a;
    }
    return Derived3;
}(Base));
var Derived4 = (function (_super) {
    __extends(Derived4, _super);
    function Derived4(a) {
        _super.call(this, function () { return this; }); // ok
        this.a = a;
    }
    return Derived4;
}(Base));
