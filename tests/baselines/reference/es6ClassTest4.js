//// [tests/cases/compiler/es6ClassTest4.ts] ////

//// [es6ClassTest4.ts]
declare class Point
{
    x: number;
    y: number;
    add(dx: number, dy: number): Point;
    mult(p: Point): Point;
    static origin: Point;
    constructor(x: number, y: number);
}


//// [es6ClassTest4.js]
