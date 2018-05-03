// @esModuleInterop: true
// @filename: point.d.ts
declare class Point {
    x: number;
    y: number;

    constructor(x: number, y: number);

    static default: "foo";
}

export = Point;
// @filename: index.ts
import Point from "./point";

const C = Point;
const p = new C(1, 2);
