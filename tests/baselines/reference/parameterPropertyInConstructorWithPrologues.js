//// [tests/cases/compiler/parameterPropertyInConstructorWithPrologues.ts] ////

//// [parameterPropertyInConstructorWithPrologues.ts]
// https://github.com/microsoft/TypeScript/issues/48671

class C {}

class Foo1 {
  constructor(private A: string) {
    "ngInject1";
  }
}

class Foo2 {
  constructor(private A: string, private B: string) {
    "ngInject1";
    "ngInject2";
  }
}

class Foo3 {
  constructor(private A: string, private B: string, private C: string) {
    "ngInject1";
    "ngInject2";
  }
}

class Foo4 {
  constructor(private A: string) {
    "ngInject1";
    console.log("hi");
  }
}

class Foo5 {
  constructor(private A: string, private B: string) {
    "ngInject1";
    "ngInject2";
    console.log("hi");
  }
}

class Foo6 {
  constructor(private A: string, private B: string, private C: string) {
    "ngInject1";
    "ngInject2";
    console.log("hi");
  }
}

class Foo7 extends C {
  constructor(
    private member: boolean,
  ) {
    "ngInject1";
    super();
    console.log("hi");
  }
}

class Foo8 extends C {
  constructor(
    private member: boolean,
  ) {
    "ngInject1";
    super();
    this.m();
    console.log("hi");
  }

  m() {}
}

class Foo9 extends C {
  constructor() {
    "ngInject1";
    "ngInject2";
    super();
    this.m();
    console.log("hi");
  }

  m() {}
}


//// [parameterPropertyInConstructorWithPrologues.js]
// https://github.com/microsoft/TypeScript/issues/48671
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
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var Foo1 = /** @class */ (function () {
    function Foo1(A) {
        "ngInject1";
        this.A = A;
    }
    return Foo1;
}());
var Foo2 = /** @class */ (function () {
    function Foo2(A, B) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
    }
    return Foo2;
}());
var Foo3 = /** @class */ (function () {
    function Foo3(A, B, C) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        this.C = C;
    }
    return Foo3;
}());
var Foo4 = /** @class */ (function () {
    function Foo4(A) {
        "ngInject1";
        this.A = A;
        console.log("hi");
    }
    return Foo4;
}());
var Foo5 = /** @class */ (function () {
    function Foo5(A, B) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        console.log("hi");
    }
    return Foo5;
}());
var Foo6 = /** @class */ (function () {
    function Foo6(A, B, C) {
        "ngInject1";
        "ngInject2";
        this.A = A;
        this.B = B;
        this.C = C;
        console.log("hi");
    }
    return Foo6;
}());
var Foo7 = /** @class */ (function (_super) {
    __extends(Foo7, _super);
    function Foo7(member) {
        "ngInject1";
        var _this = _super.call(this) || this;
        _this.member = member;
        console.log("hi");
        return _this;
    }
    return Foo7;
}(C));
var Foo8 = /** @class */ (function (_super) {
    __extends(Foo8, _super);
    function Foo8(member) {
        "ngInject1";
        var _this = _super.call(this) || this;
        _this.member = member;
        _this.m();
        console.log("hi");
        return _this;
    }
    Foo8.prototype.m = function () { };
    return Foo8;
}(C));
var Foo9 = /** @class */ (function (_super) {
    __extends(Foo9, _super);
    function Foo9() {
        "ngInject1";
        "ngInject2";
        var _this = _super.call(this) || this;
        _this.m();
        console.log("hi");
        return _this;
    }
    Foo9.prototype.m = function () { };
    return Foo9;
}(C));
