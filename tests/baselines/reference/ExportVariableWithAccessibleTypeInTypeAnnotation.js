//// [tests/cases/conformance/internalModules/exportDeclarations/ExportVariableWithAccessibleTypeInTypeAnnotation.ts] ////

//// [ExportVariableWithAccessibleTypeInTypeAnnotation.ts]
namespace A {

    export interface Point {
        x: number;
        y: number;
    }

    // valid since Point is exported
    export var Origin: Point = { x: 0, y: 0 };
}


//// [ExportVariableWithAccessibleTypeInTypeAnnotation.js]
var A;
(function (A) {
    // valid since Point is exported
    A.Origin = { x: 0, y: 0 };
})(A || (A = {}));
