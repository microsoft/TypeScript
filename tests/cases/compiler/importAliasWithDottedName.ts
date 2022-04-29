module M {
    export var x = 1;
    export module N {
        export var y = 2;
    }
}

module A {
    import N = M.N;
    var r = N.y;
    var r2 = M.N.y;
}