//// [tests/cases/conformance/internalModules/exportDeclarations/NonInitializedExportInInternalModule.ts] ////

//// [NonInitializedExportInInternalModule.ts]
module Inner {
    var;
    let;
    const;
    
    export var a;
    export let b;
    export var c: string;
    export let d: number;
    class A {}
    export var e: A;
    export let f: A;
    
    namespace B {
        export let a = 1, b, c = 2;
        export let x, y, z;
    }
    
    module C {
        export var a = 1, b, c = 2;
        export var x, y, z;
    }
    
    // Shouldn't be filtered
    export var a1 = 1;
    export let b1 = 1;
    export var c1: string = 'a';
    export let d1: number = 1;
    class D {}
    export var e1 = new D;
    export let f1 = new D;
    export var g1: D = new D;
    export let h1: D = new D;
}

//// [NonInitializedExportInInternalModule.js]
var Inner;
(function (Inner) {
    var ;
    let;
    var ;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    var B;
    (function (B) {
        B.a = 1, B.c = 2;
    })(B || (B = {}));
    var C;
    (function (C) {
        C.a = 1, C.c = 2;
    })(C || (C = {}));
    // Shouldn't be filtered
    Inner.a1 = 1;
    Inner.b1 = 1;
    Inner.c1 = 'a';
    Inner.d1 = 1;
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
    Inner.e1 = new D;
    Inner.f1 = new D;
    Inner.g1 = new D;
    Inner.h1 = new D;
})(Inner || (Inner = {}));
