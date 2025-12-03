namespace M {
    export var x = 1;
    export namespace N {
        export var y = 2;
    }
}

namespace A {
    import N = M.N;
    var r = N.y;
    var r2 = M.N.y;
}