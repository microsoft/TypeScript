//@filename: part1.ts
module Root {
    export module A {
        export interface Point {
            x: number;
            y: number;
        }

        export module Utils {
            export function mirror<T extends Point>(p: T) {
                return { x: p.y, y: p.x };
            }
        }
    }
}

//@filename: part2.ts
module otherRoot {
    export module A {
        // have to be fully qualified since in different root
        export var Origin: Root.A.Point = { x: 0, y: 0 };

        export module Utils {
            export class Plane {
                constructor(public tl: Root.A.Point, public br: Root.A.Point) { }
            }
        }
    }
}