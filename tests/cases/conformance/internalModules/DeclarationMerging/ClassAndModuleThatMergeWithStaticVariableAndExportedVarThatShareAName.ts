class Point {
    constructor(public x: number, public y: number) { }

    static Origin: Point = { x: 0, y: 0 };
}

namespace Point {
    export var Origin = ""; //expected duplicate identifier error
}


namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin: Point = { x: 0, y: 0 };
    }

    export namespace Point {
        export var Origin = ""; //expected duplicate identifier error
    }
}