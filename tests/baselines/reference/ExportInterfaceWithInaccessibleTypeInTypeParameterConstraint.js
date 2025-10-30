//// [tests/cases/conformance/internalModules/exportDeclarations/ExportInterfaceWithInaccessibleTypeInTypeParameterConstraint.ts] ////

//// [ExportInterfaceWithInaccessibleTypeInTypeParameterConstraint.ts]
namespace A {

    interface Point {
        x: number;
        y: number;
    }

    export var Origin: Point = { x: 0, y: 0 };

    export interface Point3d extends Point {
        z: number;
    }

    export var Origin3d: Point3d = { x: 0, y: 0, z: 0 };

    export interface Line<TPoint extends Point>{
        new (start: TPoint, end: TPoint);

        start: TPoint;
        end: TPoint;
    }
}


//// [ExportInterfaceWithInaccessibleTypeInTypeParameterConstraint.js]
var A;
(function (A) {
    A.Origin = { x: 0, y: 0 };
    A.Origin3d = { x: 0, y: 0, z: 0 };
})(A || (A = {}));
