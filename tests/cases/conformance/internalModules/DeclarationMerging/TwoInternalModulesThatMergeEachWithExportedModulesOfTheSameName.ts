namespace A.B {
    export var x: number;
}

namespace A{ 
    namespace B {
        export var x: string;
    }
}

// ensure the right var decl is exported
var x: number;
var x = A.B.x;

namespace X.Y.Z {
    export class Line {
        length: number;
    }
}

namespace X {
    export namespace Y {
        namespace Z {
            export class Line {
                name: string;
            }
        }
    }
}

// make sure merging works as expected
var l: { length: number };
var l: X.Y.Z.Line;
