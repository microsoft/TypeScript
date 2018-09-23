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
var A = A || (A = {});
(function (A) {
    var B = A.B || (A.B = {});
    (function (B) {
        var C = B.C || (B.C = {});
        (function (C) {
            var Class1 = /** @class */ (function () {
                function Class1() {
                }
                return Class1;
            }());
            C.Class1 = Class1;
        })(C);
    })(B);
})(A);
var D = D || (D = {});
(function (D) {
    var inner = A.B.C;
    var c1 = new inner.Class1();
    var E = D.E || (D.E = {});
    (function (E) {
        var Class2 = /** @class */ (function () {
            function Class2() {
            }
            return Class2;
        }());
        E.Class2 = Class2;
    })(E);
})(D);
var c;
c = new D.inner.Class1();
