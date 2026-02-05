//// [tests/cases/conformance/internalModules/exportDeclarations/ExportClassWithInaccessibleTypeInIndexerTypeAnnotations.ts] ////

//// [ExportClassWithInaccessibleTypeInIndexerTypeAnnotations.ts]
namespace A {

    class Point {
        x: number;
        y: number;
    }

    export class points {

        [idx: number]: Point;
        [idx: string]: Point;
    }
}



//// [ExportClassWithInaccessibleTypeInIndexerTypeAnnotations.js]
"use strict";
var A;
(function (A) {
    class Point {
        x;
        y;
    }
    class points {
    }
    A.points = points;
})(A || (A = {}));
