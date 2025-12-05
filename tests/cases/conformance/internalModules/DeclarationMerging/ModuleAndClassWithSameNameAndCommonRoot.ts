// @Filename: module.ts
namespace X.Y {
    export namespace Point {
        export var Origin = new Point(0, 0);
    }
}

// @Filename: classPoint.ts
namespace X.Y {
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
namespace A {
    export var Instance = new A();
}

// duplicate identifier
class A {
    id: string;
}
