//// [tests/cases/conformance/internalModules/exportDeclarations/ExportClassWithInaccessibleTypeInTypeParameterConstraint.ts] ////

//// [ExportClassWithInaccessibleTypeInTypeParameterConstraint.ts]
module A {

    class Point {
        x: number;
        y: number;
    }

    export var Origin: Point = { x: 0, y: 0 };

    export class Point3d extends Point {
        z: number;
    }

    export var Origin3d: Point3d = { x: 0, y: 0, z: 0 };

    export class Line<TPoint extends Point>{
        constructor(public start: TPoint, public end: TPoint) { }

        static fromorigin2d(p: Point): Line<Point>{
            return null;
        }
    }
}


//// [ExportClassWithInaccessibleTypeInTypeParameterConstraint.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A;
(function (A) {
    var Point = /** @class */ (function () {
        function Point() {
        }
        return Point;
    }());
    A.Origin = { x: 0, y: 0 };
    var Point3d = /** @class */ (function (_super) {
        __extends(Point3d, _super);
        function Point3d() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Point3d;
    }(Point));
    A.Point3d = Point3d;
    A.Origin3d = { x: 0, y: 0, z: 0 };
    var Line = /** @class */ (function () {
        function Line(start, end) {
            this.start = start;
            this.end = end;
        }
        Line.fromorigin2d = function (p) {
            return null;
        };
        return Line;
    }());
    A.Line = Line;
})(A || (A = {}));
