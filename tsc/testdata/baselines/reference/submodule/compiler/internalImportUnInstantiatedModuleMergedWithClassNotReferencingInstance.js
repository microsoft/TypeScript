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
    aProp;
}
var B;
(function (B) {
    var A = 1;
    var Y = A;
})(B || (B = {}));
