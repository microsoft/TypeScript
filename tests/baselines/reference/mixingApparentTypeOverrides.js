//// [mixingApparentTypeOverrides.ts]
type Constructor<T> = new(...args: any[]) => T;
function Tagged<T extends Constructor<{}>>(Base: T) {
  return class extends Base {
    _tag: string;
    constructor(...args: any[]) {
      super(...args);
      this._tag = "";
    }
  };
}

class A {
  toString () {
    return "class A";
  }
}

class B extends Tagged(A) {
  toString () { // Should not be an error
    return "class B";
  }
}

class C extends A {
  toString () { // Should not be an error
    return "class C";
  }
}

//// [mixingApparentTypeOverrides.js]
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
function Tagged(Base) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this._tag = "";
            return _this;
        }
        return class_1;
    }(Base));
}
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.toString = function () {
        return "class A";
    };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.toString = function () {
        return "class B";
    };
    return B;
}(Tagged(A)));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.toString = function () {
        return "class C";
    };
    return C;
}(A));
