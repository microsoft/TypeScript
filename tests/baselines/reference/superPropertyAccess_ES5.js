//// [superPropertyAccess_ES5.ts]
class MyBase {
  getValue(): number { return 1; }
  get value(): number { return 1; }
}

class MyDerived extends MyBase {
  constructor() {
    super();

    const f1 = super.getValue();
    const f2 = super.value;
  }
}

var d = new MyDerived();
var f3 = d.value;

class A {
    private _property: string;
    get property() { return this._property; }
    set property(value: string) { this._property = value }
}

class B extends A {
    set property(value: string) {
        super.property = value + " addition";
    }
}

//// [superPropertyAccess_ES5.js]
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
var MyBase = /** @class */ (function () {
    function MyBase() {
    }
    MyBase.prototype.getValue = function () { return 1; };
    Object.defineProperty(MyBase.prototype, "value", {
        get: function () { return 1; },
        enumerable: false,
        configurable: true
    });
    return MyBase;
}());
var MyDerived = /** @class */ (function (_super) {
    __extends(MyDerived, _super);
    function MyDerived() {
        var _this = _super.call(this) || this;
        var f1 = _super.prototype.getValue.call(_this);
        var f2 = _super.prototype.value;
        return _this;
    }
    return MyDerived;
}(MyBase));
var d = new MyDerived();
var f3 = d.value;
var A = /** @class */ (function () {
    function A() {
    }
    Object.defineProperty(A.prototype, "property", {
        get: function () { return this._property; },
        set: function (value) { this._property = value; },
        enumerable: false,
        configurable: true
    });
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(B.prototype, "property", {
        set: function (value) {
            _super.prototype.property = value + " addition";
        },
        enumerable: false,
        configurable: true
    });
    return B;
}(A));
