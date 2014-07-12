//// [exportImportNonInstantiatedModule.ts]
module A {
    export interface I { x: number }
}

module B {
    export import A1 = A
    
}

var x: B.A1.I = { x: 1 };

//// [exportImportNonInstantiatedModule.js]
var B;
(function (B) {
})(B || (B = {}));
var x = { x: 1 };
