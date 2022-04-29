//// [constructorOverloads7.ts]
declare class Point
{
    x: number;
    y: number;
    constructor(x: number, y: number);

     add(dx: number, dy: number): Point;
     origin: Point;

}

// Type provided by extern declaration
// Because Point is a constructor function, this is inferred
// to be Point and return type is inferred to be void
function Point(x, y) {
    this.x = x;
    this.y = y;

    return this;
}

declare function EF1(a:number, b:number):number;

function EF1(a,b) { return a+b; }


//// [constructorOverloads7.js]
// Type provided by extern declaration
// Because Point is a constructor function, this is inferred
// to be Point and return type is inferred to be void
function Point(x, y) {
    this.x = x;
    this.y = y;
    return this;
}
function EF1(a, b) { return a + b; }
