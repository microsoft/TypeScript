//// [tests/cases/compiler/moduleSymbolMerging.ts] ////

//// [A.ts]
namespace A { export interface I {} }

//// [B.ts]
///<reference path="A.ts" preserve="true" />
namespace A { ; }
namespace B {
	export function f(): A.I { return null; }
}



//// [A.js]
//// [B.js]
///<reference path="A.ts" preserve="true" />
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
/// <reference path="A.d.ts" preserve="true" />
declare namespace A { }
declare namespace B {
    function f(): A.I;
}
