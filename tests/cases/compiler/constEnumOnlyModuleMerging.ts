module Outer {
    export var x = 1;
}

module Outer {
    export const enum A { X }
}

module B {
    import O = Outer;
    var x = O.A.X;
    var y = O.x;
}