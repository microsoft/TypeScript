//// [importAliasIdentifiers.ts]
module moduleA {
    export class Point {
        constructor(public x: number, public y: number) { }
    }
}

import alias = moduleA;

var p: alias.Point;
var p: moduleA.Point;
var p: { x: number; y: number; };

class clodule {
    name: string;
}

module clodule {
    export interface Point {
        x: number; y: number;
    }
    var Point: Point = { x: 0, y: 0 };
}

import clolias = clodule;

var p: clolias.Point;
var p: clodule.Point;
var p: { x: number; y: number; };


function fundule() {
    return { x: 0, y: 0 };
}

module fundule {
    export interface Point {
        x: number; y: number;
    }
    var Point: Point = { x: 0, y: 0 };
}

import funlias = fundule;

var p: funlias.Point;
var p: fundule.Point;
var p: { x: number; y: number; };

//// [importAliasIdentifiers.js]
var moduleA;
(function (moduleA) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    moduleA.Point = Point;
})(moduleA || (moduleA = {}));
var alias = moduleA;
var p;
var p;
var p;
var clodule = /** @class */ (function () {
    function clodule() {
    }
    return clodule;
}());
(function (clodule) {
    var Point = { x: 0, y: 0 };
})(clodule || (clodule = {}));
var clolias = clodule;
var p;
var p;
var p;
function fundule() {
    return { x: 0, y: 0 };
}
(function (fundule) {
    var Point = { x: 0, y: 0 };
})(fundule || (fundule = {}));
var funlias = fundule;
var p;
var p;
var p;
