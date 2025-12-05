// @filename: function.ts
namespace A {
    export function Point() {
        return { x: 0, y: 0 };
    }
}

// @filename: module.ts
namespace A {
    export namespace Point {
        export var Origin = { x: 0, y: 0 };
    }
}

// @filename: test.ts
var fn: () => { x: number; y: number };
var fn = A.Point;

var cl: { x: number; y: number; }
var cl = A.Point();
var cl = A.Point.Origin; // not expected to be an error.


// @filename: simple.ts
namespace B {

    export function Point() {
        return { x: 0, y: 0 };
    }

    export namespace Point {
        export var Origin = { x: 0, y: 0 };
    }
}

var fn: () => { x: number; y: number };
var fn = B.Point;  // not expected to be an error. bug 840000: [corelang] Function of fundule not assignalbe as expected

var cl: { x: number; y: number; }
var cl = B.Point();
var cl = B.Point.Origin;
