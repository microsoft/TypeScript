//// [parameterPropertyInConstructorWithPrologues.ts]
// https://github.com/microsoft/TypeScript/issues/48671

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


//// [parameterPropertyInConstructorWithPrologues.js]
// https://github.com/microsoft/TypeScript/issues/48671
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
