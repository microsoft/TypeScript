// @Filename: module.ts
module X.Y {
    export module Point {
        export var Origin = new Point(0, 0);
    }
}

// @Filename: classPoint.ts
module X.Y {
    // duplicate identifier
    export class Point {
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        x: number;
        y: number;
    }
}

// @Filename: simple.ts
module A {
    export var Instance = new A();
}

// duplicate identifier
class A {
    id: string;
}
