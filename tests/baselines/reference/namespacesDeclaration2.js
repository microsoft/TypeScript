//// [tests/cases/compiler/namespacesDeclaration2.ts] ////

//// [namespacesDeclaration2.ts]
namespace N {
    function S() {}
}
module M {
    function F() {}
}

declare namespace ns {
    let f: number;
}

var foge: N.S;
var foo: M.F;
let x: ns.A;

//// [namespacesDeclaration2.js]
var N;
(function (N) {
    function S() { }
})(N || (N = {}));
var M;
(function (M) {
    function F() { }
})(M || (M = {}));
var foge;
var foo;
var x;


//// [namespacesDeclaration2.d.ts]
declare namespace N {
}
declare namespace M {
}
declare namespace ns {
    let f: number;
}
declare var foge: N.S;
declare var foo: M.F;
declare let x: ns.A;
