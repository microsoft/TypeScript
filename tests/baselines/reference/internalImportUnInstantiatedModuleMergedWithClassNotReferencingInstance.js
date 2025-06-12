//// [tests/cases/compiler/internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstance.ts] ////

//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstance.ts]
class A {
    aProp: string;
}
module A {
    export interface X { s: string }
}

module B {
    var A = 1;
    import Y = A;
}


//// [internalImportUnInstantiatedModuleMergedWithClassNotReferencingInstance.js]
class A {
}
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));
