//// [internalImportInstantiatedModuleNotReferencingInstance.ts]
module A {
    export interface X { s: string }
    export var a = 10;
}

module B {
    var A = 1;
    import Y = A;
}


//// [internalImportInstantiatedModuleNotReferencingInstance.js]
var A;
(function (A) {
    A.a = 10;
})(A || (A = {}));
var B;
(function (B) {
    var A = 1;
})(B || (B = {}));
