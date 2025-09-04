//@filename: part1.ts
namespace Root {
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
    }
}

//@filename: part2.ts
namespace otherRoot {
    export namespace A {
        // have to be fully qualified since in different root
        export var Origin: Root.A.Point = { x: 0, y: 0 };

        export namespace Utils {
            export class Plane {
                constructor(public tl: Root.A.Point, public br: Root.A.Point) { }
            }
        }
    }
}