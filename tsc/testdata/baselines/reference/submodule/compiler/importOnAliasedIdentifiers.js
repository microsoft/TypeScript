//// [tests/cases/compiler/importOnAliasedIdentifiers.ts] ////

//// [importOnAliasedIdentifiers.ts]
namespace A {
    export interface X { s: string }
    export var X: X;
}
namespace B {
    interface A { n: number }
    import Y = A; // Alias only for module A
    import Z = A.X; // Alias for both type and member A.X
    var v: Z = Z;
}

//// [importOnAliasedIdentifiers.js]
"use strict";
var A;
(function (A) {
})(A || (A = {}));
var B;
(function (B) {
    var Y = A; // Alias only for module A
    var Z = A.X; // Alias for both type and member A.X
    var v = Z;
})(B || (B = {}));
