//// [overrideParameterProperty.ts]
class Base {
  p1!: string;
}

class C1 extends Base {
  constructor(public override p1: "hello") {
    super();
    this.p1;
  }
}

class C2 extends Base {
  constructor(override p1: "hello") {
    super();
    this.p1;
  }
}

class C3 extends Base {
  constructor(override public p1: "hello") {
    super();
    this.p1;
  }

  m(override p1: "hello") {}
}

class C4 extends Base {
  constructor(public override p2: string) {
    super();
  }
}

//// [overrideParameterProperty.js]
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
    function Base() {
    }
    return Base;
}());
var C1 = /** @class */ (function (_super) {
    __extends(C1, _super);
    function C1(p1) {
        var _this = _super.call(this) || this;
        _this.p1 = p1;
        _this.p1;
        return _this;
    }
    return C1;
}(Base));
var C2 = /** @class */ (function (_super) {
    __extends(C2, _super);
    function C2(p1) {
        var _this = _super.call(this) || this;
        _this.p1 = p1;
        _this.p1;
        return _this;
    }
    return C2;
}(Base));
var C3 = /** @class */ (function (_super) {
    __extends(C3, _super);
    function C3(p1) {
        var _this = _super.call(this) || this;
        _this.p1 = p1;
        _this.p1;
        return _this;
    }
    C3.prototype.m = function (p1) { };
    return C3;
}(Base));
var C4 = /** @class */ (function (_super) {
    __extends(C4, _super);
    function C4(p2) {
        var _this = _super.call(this) || this;
        _this.p2 = p2;
        return _this;
    }
    return C4;
}(Base));
