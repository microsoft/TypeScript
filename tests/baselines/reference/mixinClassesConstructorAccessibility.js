//// [mixinClassesConstructorAccessibility.ts]
function PrivateConstructorMixinGenericBaseType<TBase extends new(...args: any[]) => any>(Base: TBase) {
    return class PrivateConstructorMixinGenericBaseType extends Base {
      private constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function PrivateConstructorMixin(Base: new(...args: any[]) => any) {
    return class PrivateConstructorMixin extends Base {
      private constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function ProtectedConstructorMixinGenericBaseType<TBase extends new(...args: any[]) => any>(Base: TBase) {
    return class ProtectedConstructorMixinGenericBaseType extends Base {
      protected constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function ProtectedConstructorMixin(Base: new(...args: any[]) => any) {
    return class ProtectedConstructorMixin extends Base {
      protected constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function PublicConstructorMixinGenericBaseType(Base: new(...args: any[]) => any) {
    return class PublicConstructorMixinGenericBaseType extends Base {
      constructor(...args: any[]) {
        super();
      }
    }
  }
  
  function PublicConstructorMixin(Base: new(...args: any[]) => any) {
    return class PublicConstructorMixin extends Base {
      constructor(...args: any[]) {
        super();
      }
    }
  }
  
  class Base {
    constructor() {}
  }
  
  new (PrivateConstructorMixin(Base))(); // error: PrivateConstructorMixin is private
  new (PrivateConstructorMixinGenericBaseType(Base))(); // error: PrivateConstructorMixinGenericBaseType is private
  
  new (ProtectedConstructorMixin(Base))(); // error: ProtectedConstructorMixin is protected
  new (ProtectedConstructorMixinGenericBaseType(Base))(); // error: ProtectedConstructorMixinGenericBaseType is protected
  
  new (PublicConstructorMixin(Base))();
  new (PublicConstructorMixinGenericBaseType(Base))();

//// [mixinClassesConstructorAccessibility.js]
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
function PrivateConstructorMixinGenericBaseType(Base) {
    return /** @class */ (function (_super) {
        __extends(PrivateConstructorMixinGenericBaseType, _super);
        function PrivateConstructorMixinGenericBaseType() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this) || this;
        }
        return PrivateConstructorMixinGenericBaseType;
    }(Base));
}
function PrivateConstructorMixin(Base) {
    return /** @class */ (function (_super) {
        __extends(PrivateConstructorMixin, _super);
        function PrivateConstructorMixin() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this) || this;
        }
        return PrivateConstructorMixin;
    }(Base));
}
function ProtectedConstructorMixinGenericBaseType(Base) {
    return /** @class */ (function (_super) {
        __extends(ProtectedConstructorMixinGenericBaseType, _super);
        function ProtectedConstructorMixinGenericBaseType() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this) || this;
        }
        return ProtectedConstructorMixinGenericBaseType;
    }(Base));
}
function ProtectedConstructorMixin(Base) {
    return /** @class */ (function (_super) {
        __extends(ProtectedConstructorMixin, _super);
        function ProtectedConstructorMixin() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this) || this;
        }
        return ProtectedConstructorMixin;
    }(Base));
}
function PublicConstructorMixinGenericBaseType(Base) {
    return /** @class */ (function (_super) {
        __extends(PublicConstructorMixinGenericBaseType, _super);
        function PublicConstructorMixinGenericBaseType() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this) || this;
        }
        return PublicConstructorMixinGenericBaseType;
    }(Base));
}
function PublicConstructorMixin(Base) {
    return /** @class */ (function (_super) {
        __extends(PublicConstructorMixin, _super);
        function PublicConstructorMixin() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _super.call(this) || this;
        }
        return PublicConstructorMixin;
    }(Base));
}
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
new (PrivateConstructorMixin(Base))(); // error: PrivateConstructorMixin is private
new (PrivateConstructorMixinGenericBaseType(Base))(); // error: PrivateConstructorMixinGenericBaseType is private
new (ProtectedConstructorMixin(Base))(); // error: ProtectedConstructorMixin is protected
new (ProtectedConstructorMixinGenericBaseType(Base))(); // error: ProtectedConstructorMixinGenericBaseType is protected
new (PublicConstructorMixin(Base))();
new (PublicConstructorMixinGenericBaseType(Base))();
