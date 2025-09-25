//@filename: part1.ts
export namespace A {
    export interface Point {
        x: number;
        y: number;
    }

    export namespace Utils {
        export function mirror<T extends Point>(p: T) {
            return { x: p.y, y: p.x };
        }
    }

    export var Origin: Point = { x: 0, y: 0 };
}

//@filename: part2.ts
export namespace A {
    // collision with 'Origin' var in other part of merged module
    export var Origin: Point = { x: 0, y: 0 };

    export namespace Utils {
        export class Plane {
            constructor(public tl: Point, public br: Point) { }
        }
    }
}
