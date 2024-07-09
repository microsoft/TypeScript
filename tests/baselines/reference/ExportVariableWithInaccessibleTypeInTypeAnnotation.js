//// [tests/cases/conformance/internalModules/exportDeclarations/ExportVariableWithInaccessibleTypeInTypeAnnotation.ts] ////

//// [ExportVariableWithInaccessibleTypeInTypeAnnotation.ts]
module A {

    export interface Point {
        x: number;
        y: number;
    }

    // valid since Point is exported
    export var Origin: Point = { x: 0, y: 0 };

    interface Point3d extends Point {
        z: number;
    }

    // invalid Point3d is not exported
    export var Origin3d: Point3d = { x: 0, y: 0, z: 0 };
}


//// [ExportVariableWithInaccessibleTypeInTypeAnnotation.js]
var A;
(function (A) {
    // valid since Point is exported
    A.Origin = { x: 0, y: 0 };
    // invalid Point3d is not exported
    A.Origin3d = { x: 0, y: 0, z: 0 };
})(A || (A = {}));
