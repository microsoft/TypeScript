//// [tests/cases/conformance/internalModules/DeclarationMerging/ModuleAndFunctionWithSameNameAndCommonRoot.ts] ////

//// [module.ts]
namespace A {
    export namespace Point {
        export var Origin = { x: 0, y: 0 };
    }
}

//// [function.ts]
namespace A {
    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}

//// [simple.ts]
namespace B {

    export namespace Point {
        export var Origin = { x: 0, y: 0 };
    }

    // duplicate identifier error
    export function Point() {
        return { x: 0, y: 0 };
    }
}


//// [module.js]
"use strict";
var A;
(function (A) {
    let Point;
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point = A.Point || (A.Point = {}));
})(A || (A = {}));
//// [function.js]
"use strict";
var A;
(function (A) {
    // duplicate identifier error
    function Point() {
        return { x: 0, y: 0 };
    }
    A.Point = Point;
})(A || (A = {}));
//// [simple.js]
"use strict";
var B;
(function (B) {
    let Point;
    (function (Point) {
        Point.Origin = { x: 0, y: 0 };
    })(Point = B.Point || (B.Point = {}));
    // duplicate identifier error
    function Point() {
        return { x: 0, y: 0 };
    }
    B.Point = Point;
})(B || (B = {}));
