//// [tests/cases/compiler/protectedMembersThisParameter.ts] ////

//// [protectedMembersThisParameter.ts]
class Message {
  protected secret(): void {}
}
class MessageWrapper {
  message: Message = new Message();
  wrap<T>() {
    let m = this.message;
    let f = function(this: T) {
      m.secret(); // should error
    }
  }
}

class A {
  protected a() {}
}
class B extends A {
  protected b() {}
}
class C extends A {
  protected c() {}
}
class Z {
  protected z() {}
}

function bA<T extends A>(this: T, arg: B) {
  this.a();
  arg.a();
  arg.b(); // should error to avoid cross-hierarchy protected access https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-hierarchy-protected-access
}
function bB<T extends B>(this: T, arg: B) {
  this.a();
  this.b();
  arg.a();
  arg.b();
}
function bC<T extends C>(this: T, arg: B) {
  this.a();
  this.c();
  arg.a(); // should error
  arg.b(); // should error
}
function bZ<T extends Z>(this: T, arg: B) {
  this.z();
  arg.a(); // should error
  arg.b(); // should error
}
function bString<T extends string>(this: T, arg: B) {
  this.toLowerCase();
  arg.a(); // should error
  arg.b(); // should error
}
function bAny<T>(this: T, arg: B) {
  arg.a(); // should error
  arg.b(); // should error
}

class D {
  protected d() {}

  derived1(arg: D1) {
    arg.d();
    arg.d1(); // should error
  }
  derived1ThisD(this: D, arg: D1) {
    arg.d();
    arg.d1(); // should error
  }
  derived1ThisD1(this: D1, arg: D1) {
    arg.d();
    arg.d1();
  }

  derived2(arg: D2) {
    arg.d(); // should error because of overridden method in D2
    arg.d2(); // should error
  }
  derived2ThisD(this: D, arg: D2) {
    arg.d(); // should error because of overridden method in D2
    arg.d2(); // should error
  }
  derived2ThisD2(this: D2, arg: D2) {
    arg.d();
    arg.d2();
  }
}
class D1 extends D {
  protected d1() {}
}
class D2 extends D {
  protected d() {}
  protected d2() {}
}



//// [protectedMembersThisParameter.js]
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
var Message = /** @class */ (function () {
    function Message() {
    }
    Message.prototype.secret = function () { };
    return Message;
}());
var MessageWrapper = /** @class */ (function () {
    function MessageWrapper() {
        this.message = new Message();
    }
    MessageWrapper.prototype.wrap = function () {
        var m = this.message;
        var f = function () {
            m.secret(); // should error
        };
    };
    return MessageWrapper;
}());
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.a = function () { };
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.b = function () { };
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    C.prototype.c = function () { };
    return C;
}(A));
var Z = /** @class */ (function () {
    function Z() {
    }
    Z.prototype.z = function () { };
    return Z;
}());
function bA(arg) {
    this.a();
    arg.a();
    arg.b(); // should error to avoid cross-hierarchy protected access https://www.typescriptlang.org/docs/handbook/2/classes.html#cross-hierarchy-protected-access
}
function bB(arg) {
    this.a();
    this.b();
    arg.a();
    arg.b();
}
function bC(arg) {
    this.a();
    this.c();
    arg.a(); // should error
    arg.b(); // should error
}
function bZ(arg) {
    this.z();
    arg.a(); // should error
    arg.b(); // should error
}
function bString(arg) {
    this.toLowerCase();
    arg.a(); // should error
    arg.b(); // should error
}
function bAny(arg) {
    arg.a(); // should error
    arg.b(); // should error
}
var D = /** @class */ (function () {
    function D() {
    }
    D.prototype.d = function () { };
    D.prototype.derived1 = function (arg) {
        arg.d();
        arg.d1(); // should error
    };
    D.prototype.derived1ThisD = function (arg) {
        arg.d();
        arg.d1(); // should error
    };
    D.prototype.derived1ThisD1 = function (arg) {
        arg.d();
        arg.d1();
    };
    D.prototype.derived2 = function (arg) {
        arg.d(); // should error because of overridden method in D2
        arg.d2(); // should error
    };
    D.prototype.derived2ThisD = function (arg) {
        arg.d(); // should error because of overridden method in D2
        arg.d2(); // should error
    };
    D.prototype.derived2ThisD2 = function (arg) {
        arg.d();
        arg.d2();
    };
    return D;
}());
var D1 = /** @class */ (function (_super) {
    __extends(D1, _super);
    function D1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D1.prototype.d1 = function () { };
    return D1;
}(D));
var D2 = /** @class */ (function (_super) {
    __extends(D2, _super);
    function D2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D2.prototype.d = function () { };
    D2.prototype.d2 = function () { };
    return D2;
}(D));
