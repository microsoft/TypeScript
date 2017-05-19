//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts]
class A {
    aProp: string;
}
module A {
    export interface X { s: string }
}

module B {
    import Y = A;
}


//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.js]
var A = (function () {
    function A() {
    }
    return A;
}());
