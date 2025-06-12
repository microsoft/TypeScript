//// [tests/cases/compiler/innerAliases.ts] ////

//// [innerAliases.ts]
module A {
    export module B {
        export module C {
            export class Class1 {}
        }
    }
}

module D {
    import inner = A.B.C; 
   
    var c1 = new inner.Class1(); 

    export module E { 
        export class Class2 {}
    }
}

var c: D.inner.Class1;

c = new D.inner.Class1();



//// [innerAliases.js]
var A;
(function (A) {
    let B;
    (function (B) {
        let C;
        (function (C) {
            class Class1 {
            }
            C.Class1 = Class1;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var D;
(function (D) {
    var inner = A.B.C;
    var c1 = new inner.Class1();
    let E;
    (function (E) {
        class Class2 {
        }
        E.Class2 = Class2;
    })(E = D.E || (D.E = {}));
})(D || (D = {}));
var c;
c = new D.inner.Class1();
