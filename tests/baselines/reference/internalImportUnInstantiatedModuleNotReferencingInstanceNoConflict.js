//// [tests/cases/compiler/internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.ts] ////

//// [internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.ts]
module A {
    export interface X { s: string }
}

module B {
    var A = 1;
    import Y = A;
}


//// [internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.js]
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));
