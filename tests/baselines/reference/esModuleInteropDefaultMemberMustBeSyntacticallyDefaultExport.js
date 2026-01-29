//// [tests/cases/compiler/esModuleInteropDefaultMemberMustBeSyntacticallyDefaultExport.ts] ////

//// [point.d.ts]
declare class Point {
    x: number;
    y: number;

    constructor(x: number, y: number);

    static default: "foo";
}

export = Point;
//// [index.ts]
import Point from "./point";

const C = Point;
const p = new C(1, 2);


//// [index.js]
import Point from "./point";
const C = Point;
const p = new C(1, 2);
