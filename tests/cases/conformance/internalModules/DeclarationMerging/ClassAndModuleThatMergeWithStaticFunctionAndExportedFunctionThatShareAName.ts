class Point {
    constructor(public x: number, public y: number) { }

    static Origin(): Point { return { x: 0, y: 0 }; } // unexpected error here bug 840246
}

module Point {
    export function Origin() { return null; } //expected duplicate identifier error
}


module A {
    export class Point {
        constructor(public x: number, public y: number) { }

        static Origin(): Point { return { x: 0, y: 0 }; } // unexpected error here bug 840246
    }

    export module Point {
        export function Origin() { return ""; }//expected duplicate identifier error
    }
}