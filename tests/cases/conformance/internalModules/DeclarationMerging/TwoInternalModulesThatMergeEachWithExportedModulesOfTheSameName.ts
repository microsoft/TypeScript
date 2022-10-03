module A.B {
    export var x: number;
}

module A{ 
    module B {
        export var x: string;
    }
}

// ensure the right var decl is exported
var x: number;
var x = A.B.x;

module X.Y.Z {
    export class Line {
        length: number;
    }
}

module X {
    export module Y {
        module Z {
            export class Line {
                name: string;
            }
        }
    }
}

// make sure merging works as expected
var l: { length: number };
var l: X.Y.Z.Line;
