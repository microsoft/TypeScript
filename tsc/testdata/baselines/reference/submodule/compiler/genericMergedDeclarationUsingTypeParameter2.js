//// [tests/cases/compiler/genericMergedDeclarationUsingTypeParameter2.ts] ////

//// [genericMergedDeclarationUsingTypeParameter2.ts]
class foo<T> { constructor(x: T) { } }
namespace foo {
    export var x: T;
    var y = <T>1;
}


//// [genericMergedDeclarationUsingTypeParameter2.js]
"use strict";
class foo {
    constructor(x) { }
}
(function (foo) {
    var y = 1;
})(foo || (foo = {}));
