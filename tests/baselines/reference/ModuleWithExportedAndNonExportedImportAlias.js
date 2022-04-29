//// [ModuleWithExportedAndNonExportedImportAlias.ts]
module A {
    export interface Point {
        x: number;
        y: number;
    }

    interface Point3d extends Point {
        z: number;
    }
}

module B {
    export class Line {
        constructor(public start: A.Point, public end: A.Point) { }
    }
}

module Geometry {
    export import Points = A;
    import Lines = B;

    export var Origin: Points.Point = { x: 0, y: 0 };

    // this is valid since B.Line _is_ visible outside Geometry
    export var Unit: Lines.Line = new Lines.Line(Origin, { x: 1, y: 0 });
}

// expected to work since all are exported
var p: { x: number; y: number };
var p: Geometry.Points.Point;
var p = Geometry.Origin;

var line: { start: { x: number; y: number }; end: { x: number; y: number; } };
var line = Geometry.Unit;

// not expected to work since non are exported
var line = Geometry.Lines.Line;



//// [ModuleWithExportedAndNonExportedImportAlias.js]
var B;
(function (B) {
    var Line = /** @class */ (function () {
        function Line(start, end) {
            this.start = start;
            this.end = end;
        }
        return Line;
    }());
    B.Line = Line;
})(B || (B = {}));
var Geometry;
(function (Geometry) {
    var Lines = B;
    Geometry.Origin = { x: 0, y: 0 };
    // this is valid since B.Line _is_ visible outside Geometry
    Geometry.Unit = new Lines.Line(Geometry.Origin, { x: 1, y: 0 });
})(Geometry || (Geometry = {}));
// expected to work since all are exported
var p;
var p;
var p = Geometry.Origin;
var line;
var line = Geometry.Unit;
// not expected to work since non are exported
var line = Geometry.Lines.Line;
