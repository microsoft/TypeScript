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