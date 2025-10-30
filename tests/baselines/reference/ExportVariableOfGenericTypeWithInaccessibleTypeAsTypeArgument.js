//// [tests/cases/conformance/internalModules/exportDeclarations/ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.ts] ////

//// [ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.ts]
namespace A {
    class B {
        id: number;
    }

    export var beez: Array<B>;
    export var beez2 = new Array<B>();
}

//// [ExportVariableOfGenericTypeWithInaccessibleTypeAsTypeArgument.js]
var A;
(function (A) {
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
    A.beez2 = new Array();
})(A || (A = {}));
