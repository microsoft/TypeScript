//// [tests/cases/compiler/typePredicateInherit.ts] ////

//// [typePredicateInherit.ts]
interface A {
  method1(): this is {
    a: 1
  }
  method2(): boolean;
  method3(): this is {
    a: 1
  };
}
class B implements A {
  method1() { }      // should error

  method2() { }   // should error

  method3() {   // should error
    return true
  }
}

class C {
  method1(): this is {
    a: 1
  } {
    return true;
  }

  method2(): this is {
    a: 1
  } {
    return true;
  }

  method3(): this is {
    a: 1
  } {
    return true;
  }
}

class D extends C {
  method1(): void {   // should error
  }

  method2(): this is {  // should ok
    a: 1
  } {
    return true;
  }

  method3(): boolean {  // should error
    return true;
  }
}

//// [typePredicateInherit.js]
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
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.method1 = function () { }; // should error
    B.prototype.method2 = function () { }; // should error
    B.prototype.method3 = function () {
        return true;
    };
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method1 = function () {
        return true;
    };
    C.prototype.method2 = function () {
        return true;
    };
    C.prototype.method3 = function () {
        return true;
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.method1 = function () {
    };
    D.prototype.method2 = function () {
        return true;
    };
    D.prototype.method3 = function () {
        return true;
    };
    return D;
}(C));
