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
