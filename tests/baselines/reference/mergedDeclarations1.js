//// [mergedDeclarations1.ts]
interface Point {
    x: number;
    y: number;
}
function point(x: number, y: number): Point {
    return { x: x, y: y };
}
module point {
    export var origin = point(0, 0);
    export function equals(p1: Point, p2: Point) {
        return p1.x == p2.x && p1.y == p2.y;
    }
}
var p1 = point(0, 0);
var p2 = point.origin;
var b = point.equals(p1, p2);

//// [mergedDeclarations1.js]
function point(x, y) {
    return { x: x, y: y };
}
(function (point) {
    point.origin = point(0, 0);
    function equals(p1, p2) {
        return p1.x == p2.x && p1.y == p2.y;
    }
    point.equals = equals;
})(point || (point = {}));
var p1 = point(0, 0);
var p2 = point.origin;
var b = point.equals(p1, p2);
