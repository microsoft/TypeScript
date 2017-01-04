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
var Base = (function () {
    function Base(a) {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = _super.call(this, _this) || this;
        return _this;
    }
    return Derived;
}(Base));
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2(a) {
        var _this = _super.call(this, _this) || this;
        _this.a = a;
        return _this;
    }
    return Derived2;
}(Base));
var Derived3 = (function (_super) {
    __extends(Derived3, _super);
    function Derived3(a) {
        var _this = _super.call(this, function () { return _this; }) || this;
        _this.a = a;
        return _this;
    }
    return Derived3;
}(Base));
var Derived4 = (function (_super) {
    __extends(Derived4, _super);
    function Derived4(a) {
        var _this = _super.call(this, function () { return this; }) || this;
        _this.a = a;
        return _this;
    }
    return Derived4;
}(Base));
