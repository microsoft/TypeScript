//// [tests/cases/compiler/clinterfaces.ts] ////

//// [clinterfaces.ts]
module M {
    class C { }
    interface C { }
    interface D { }
    class D { }
}

interface Foo<T> {
    a: string;
}

class Foo<T>{
    b: number;
}

class Bar<T>{
    b: number;
}

interface Bar<T> {
    a: string;
}

export = Foo;


//// [clinterfaces.js]
"use strict";
var M;
(function (M) {
    class C {
    }
    class D {
    }
})(M || (M = {}));
class Foo {
    b;
}
class Bar {
    b;
}
module.exports = Foo;
