class Point {
    constructor(public x: number, public y: number) { }

    static Origin(): Point { return { x: 0, y: 0 }; }
}

namespace Point {
    function Origin() { return ""; }// not an error, since not exported
}


namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin(): Point { return { x: 0, y: 0 }; }
    }

    export namespace Point {
        function Origin() { return ""; }// not an error since not exported
    }
}