namespace Outer {
    export var x = 1;
}

namespace Outer {
    export const enum A { X }
}

namespace B {
    import O = Outer;
    var x = O.A.X;
    var y = O.x;
}