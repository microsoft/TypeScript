//// [tests/cases/conformance/decorators/invalid/decoratorOnImportEquals1.ts] ////

//// [decoratorOnImportEquals1.ts]
declare function dec<T>(target: T): T;

module M1 {
    export var X: number;
}

module M2 {
    @dec
    import X = M1.X;
}

//// [decoratorOnImportEquals1.js]
var M1;
(function (M1) {
})(M1 || (M1 = {}));
