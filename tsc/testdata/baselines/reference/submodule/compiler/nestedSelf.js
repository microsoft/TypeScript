//// [tests/cases/compiler/nestedSelf.ts] ////

//// [nestedSelf.ts]
module M {
 export class C {
   public n = 42;
   public foo() { [1,2,3].map((x) => { return this.n * x; })}
 }
}



//// [nestedSelf.js]
var M;
(function (M) {
    class C {
        n = 42;
        foo() { [1, 2, 3].map((x) => { return this.n * x; }); }
    }
    M.C = C;
})(M || (M = {}));
