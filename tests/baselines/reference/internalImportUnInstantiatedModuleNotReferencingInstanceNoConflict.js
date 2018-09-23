//// [internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.ts]
module A {
    export interface X { s: string }
}

module B {
    var A = 1;
    import Y = A;
}


//// [internalImportUnInstantiatedModuleNotReferencingInstanceNoConflict.js]
var B = B || (B = {});
(function (B) {
    var A = 1;
})(B);
