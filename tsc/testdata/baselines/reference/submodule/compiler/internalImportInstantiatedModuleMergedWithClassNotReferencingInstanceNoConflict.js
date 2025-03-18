//// [tests/cases/compiler/internalImportInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts] ////

//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.ts]
class A {
    aProp: string;
}
module A {
    export interface X { s: string }
    export var a = 10;
}

module B {
    import Y = A;
}


//// [internalImportInstantiatedModuleMergedWithClassNotReferencingInstanceNoConflict.js]
class A {
    aProp;
}
(function (A) {
    A.a = 10;
})(A || (A = {}));
