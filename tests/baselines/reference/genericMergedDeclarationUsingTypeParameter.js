//// [genericMergedDeclarationUsingTypeParameter.ts]
function foo<T extends U, U>(y: T, z: U) { return y; }
module foo {
    export var x: T;
    var y = <T>1;
}


//// [genericMergedDeclarationUsingTypeParameter.js]
function foo(y, z) { return y; }
(function (foo) {
    var y = 1;
})(foo || (foo = {}));
