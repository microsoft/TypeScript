//// [tests/cases/compiler/moduleSymbolMerging.ts] ////

//// [A.ts]
module A { export interface I {} }

//// [B.ts]
///<reference path="A.ts" />
module A { ; }
module B {
	export function f(): A.I { return null; }
}



//// [A.js]
//// [B.js]
///<reference path="A.ts" />
var A;
(function (A) {
    ;
})(A || (A = {}));
var B;
(function (B) {
    function f() { return null; }
    B.f = f;
})(B || (B = {}));


//// [A.d.ts]
declare namespace A {
    interface I {
    }
}
//// [B.d.ts]
declare namespace A { }
declare namespace B {
    function f(): A.I;
}


//// [DtsFileErrors]


B.d.ts(3,21): error TS2694: Namespace 'A' has no exported member 'I'.


==== B.d.ts (1 errors) ====
    declare namespace A { }
    declare namespace B {
        function f(): A.I;
                        ~
!!! error TS2694: Namespace 'A' has no exported member 'I'.
    }
    
==== A.d.ts (0 errors) ====
    declare namespace A {
        interface I {
        }
    }
    