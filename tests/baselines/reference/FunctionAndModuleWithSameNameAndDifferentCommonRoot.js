//// [tests/cases/conformance/internalModules/DeclarationMerging/FunctionAndModuleWithSameNameAndDifferentCommonRoot.ts] ////

//// [function.ts]
module A {
    export function Point() {
        return { x: 0, y: 0 };
    }
}

//// [module.ts]
module B {
    export module Point {
        export var Origin = { x: 0, y: 0 };
    }
}

//// [test.ts]
var fn: () => { x: number; y: number };
var fn = A.Point;

var cl: { x: number; y: number; }
var cl = B.Point.Origin;


//// [function.js]
var A = A || (A = {});
(function (A) {
    function Point() {
        return { x: 0, y: 0 };
    }
    A.Point = Point;
})(A);
//// [module.js]
var B = B || (B = {});
(function (B) {
    var Point = B.Point || (B.Point = {});
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point);
})(B);
//// [test.js]
var fn;
var fn = A.Point;
var cl;
var cl = B.Point.Origin;
