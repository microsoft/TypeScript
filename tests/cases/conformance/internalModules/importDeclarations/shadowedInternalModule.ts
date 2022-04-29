// all errors imported modules conflict with local variables

module A {
    export var Point = { x: 0, y: 0 }
    export interface Point {
        x: number;
        y: number;
    }
} 

module B {
    var A = { x: 0, y: 0 };
    import Point = A;
}

module X {
    export module Y {
        export interface Point{
            x: number;
            y: number
        }
    }

    export class Y {
        name: string;
    }
}

module Z {
    import Y = X.Y;

    var Y = 12;
}