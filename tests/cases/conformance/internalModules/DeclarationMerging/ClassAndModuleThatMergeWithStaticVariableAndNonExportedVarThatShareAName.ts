class Point {
    constructor(public x: number, public y: number) { }

    static Origin: Point = { x: 0, y: 0 };
}

namespace Point {
    var Origin = ""; // not an error, since not exported
}


namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin: Point = { x: 0, y: 0 };
    }

    export namespace Point {
        var Origin = ""; // not an error since not exported
    }
}