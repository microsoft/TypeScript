declare class Point
{
    x: number;
    y: number;
    add(dx: number, dy: number): Point;
    mult(p: Point): Point;
    static origin: Point;
    constructor(x: number, y: number);
}
