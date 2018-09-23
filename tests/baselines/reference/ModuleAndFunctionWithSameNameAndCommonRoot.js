//// [tests/cases/conformance/internalModules/DeclarationMerging/ModuleAndFunctionWithSameNameAndCommonRoot.ts] ////

//// [module.ts]
module A {
    export module Point {
        export var Origin = { x: 0, y: 0 };
    }
}

//// [function.ts]
module A {
    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}

//// [simple.ts]
module B {

    export module Point {
        export var Origin = { x: 0, y: 0 };
    }

    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}


//// [module.js]
var A = A || (A = {});
(function (A) {
    var Point = A.Point || (A.Point = {});
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point);
})(A);
//// [function.js]
var A = A || (A = {});
(function (A) {
    // duplicate identifier error
    function Point() {
        return { x: 0, y: 0 };
    }
    A.Point = Point;
})(A);
//// [simple.js]
var B = B || (B = {});
(function (B) {
    var Point = B.Point || (B.Point = {});
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point);
    // duplicate identifier error
    function Point() {
        return { x: 0, y: 0 };
    }
    B.Point = Point;
})(B);
