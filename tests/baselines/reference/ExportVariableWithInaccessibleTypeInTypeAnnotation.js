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
    A.Origin = { x: 0, y: 0 };
    A.Origin3d = { x: 0, y: 0, z: 0 };
})(A || (A = {}));
