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
    (function (B) {
        (function (C) {
            var Class1 = (function () {
                function Class1() {
                }
                return Class1;
            })();
            C.Class1 = Class1;
        })(B.C || (B.C = {}));
        var C = B.C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));
var D;
(function (D) {
    var inner = A.B.C;
    var c1 = new inner.Class1();
    (function (E) {
        var Class2 = (function () {
            function Class2() {
            }
            return Class2;
        })();
        E.Class2 = Class2;
    })(D.E || (D.E = {}));
    var E = D.E;
})(D || (D = {}));
var c;
c = new D.inner.Class1();
