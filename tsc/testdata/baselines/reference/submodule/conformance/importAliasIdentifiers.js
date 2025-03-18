//// [tests/cases/conformance/internalModules/importDeclarations/importAliasIdentifiers.ts] ////

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
    class Point {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    moduleA.Point = Point;
})(moduleA || (moduleA = {}));
var p;
var p;
var p;
class clodule {
    name;
}
(function (clodule) {
    var Point = { x: 0, y: 0 };
})(clodule || (clodule = {}));
var p;
var p;
var p;
function fundule() {
    return { x: 0, y: 0 };
}
(function (fundule) {
    var Point = { x: 0, y: 0 };
})(fundule || (fundule = {}));
var p;
var p;
var p;
