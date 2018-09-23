//// [tests/cases/conformance/internalModules/DeclarationMerging/FunctionAndModuleWithSameNameAndCommonRoot.ts] ////

//// [function.ts]
module A {
    export function Point() {
        return { x: 0, y: 0 };
    }
}

//// [module.ts]
module A {
    export module Point {
        export var Origin = { x: 0, y: 0 };
    }
}

//// [test.ts]
var fn: () => { x: number; y: number };
var fn = A.Point;

var cl: { x: number; y: number; }
var cl = A.Point();
var cl = A.Point.Origin; // not expected to be an error.


//// [simple.ts]
module B {

    export function Point() {
        return { x: 0, y: 0 };
    }

    export module Point {
        export var Origin = { x: 0, y: 0 };
    }
}

var fn: () => { x: number; y: number };
var fn = B.Point;  // not expected to be an error. bug 840000: [corelang] Function of fundule not assignalbe as expected

var cl: { x: number; y: number; }
var cl = B.Point();
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
var A = A || (A = {});
(function (A) {
    var Point = A.Point || (A.Point = {});
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point);
})(A);
//// [test.js]
var fn;
var fn = A.Point;
var cl;
var cl = A.Point();
var cl = A.Point.Origin; // not expected to be an error.
//// [simple.js]
var B = B || (B = {});
(function (B) {
    function Point() {
        return { x: 0, y: 0 };
    }
    B.Point = Point;
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point);
})(B);
var fn;
var fn = B.Point; // not expected to be an error. bug 840000: [corelang] Function of fundule not assignalbe as expected
var cl;
var cl = B.Point();
var cl = B.Point.Origin;
