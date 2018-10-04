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
declare module A {
    interface I {
    }
}
//// [B.d.ts]
/// <reference path="A.d.ts" />
declare module A { }
declare module B {
    function f(): A.I;
}
