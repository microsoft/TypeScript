//// [thisInSuperCall.ts]
class Base { 
    constructor(x: any) {}
}

class Foo extends Base {
    constructor() {
        super(this); // error: "super" has to be called before "this" accessing
    }
}

class Foo2 extends Base {
    public p = 0;
    constructor() {
        super(this); // error
    }
}

class Foo3 extends Base {
    constructor(public p) {
        super(this); // error
    }
}

//// [thisInSuperCall.js]
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
    }
    return Base;
}());
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        var _this = _super.call(this, _this) || this;
        return _this;
    }
    return Foo;
}(Base));
var Foo2 = /** @class */ (function (_super) {
    __extends(Foo2, _super);
    function Foo2() {
        var _this = _super.call(this, _this) || this;
        _this.p = 0;
        return _this;
    }
    return Foo2;
}(Base));
var Foo3 = /** @class */ (function (_super) {
    __extends(Foo3, _super);
    function Foo3(p) {
        var _this = _super.call(this, _this) || this;
        _this.p = p;
        return _this;
    }
    return Foo3;
}(Base));
