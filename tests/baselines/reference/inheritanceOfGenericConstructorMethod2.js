//// [tests/cases/compiler/inheritanceOfGenericConstructorMethod2.ts] ////

//// [inheritanceOfGenericConstructorMethod2.ts]
module M {
   export class C1 { }
   export class C2<T> { }
}
module N {
   export class D1 extends M.C1 { }
   export class D2<T> extends M.C2<T> { }
}

var c = new M.C2<number>(); // no error
var n = new N.D1(); // no error
var n2 = new N.D2<number>(); // error
var n3 = new N.D2(); // no error, D2<any>


//// [inheritanceOfGenericConstructorMethod2.js]
var M;
(function (M) {
    class C1 {
    }
    M.C1 = C1;
    class C2 {
    }
    M.C2 = C2;
})(M || (M = {}));
var N;
(function (N) {
    class D1 extends M.C1 {
    }
    N.D1 = D1;
    class D2 extends M.C2 {
    }
    N.D2 = D2;
})(N || (N = {}));
var c = new M.C2(); // no error
var n = new N.D1(); // no error
var n2 = new N.D2(); // error
var n3 = new N.D2(); // no error, D2<any>
