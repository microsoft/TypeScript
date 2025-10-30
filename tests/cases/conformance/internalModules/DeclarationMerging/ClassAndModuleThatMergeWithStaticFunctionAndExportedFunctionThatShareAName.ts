class Point {
    constructor(public x: number, public y: number) { }

    static Origin(): Point { return { x: 0, y: 0 }; } // unexpected error here bug 840246
}

namespace Point {
    export function Origin() { return null; } //expected duplicate identifier error
}


namespace A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin(): Point { return { x: 0, y: 0 }; } // unexpected error here bug 840246
    }

    export namespace Point {
        export function Origin() { return ""; }//expected duplicate identifier error
    }
}