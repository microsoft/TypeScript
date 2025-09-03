//// [tests/cases/conformance/internalModules/exportDeclarations/ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.ts] ////

//// [ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.ts]
module A {
    class B {
        id: number;
    }

    export var beez: Array<B>;
    export var beez2 = new Array<B>();
}

//// [ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.js]
var A;
(function (A) {
    class B {
        id;
    }
    A.beez2 = new Array();
})(A || (A = {}));
