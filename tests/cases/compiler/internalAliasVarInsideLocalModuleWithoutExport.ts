//@module: amd
// @declaration: true
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}
