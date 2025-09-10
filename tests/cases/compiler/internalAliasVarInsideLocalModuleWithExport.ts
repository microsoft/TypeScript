//@module: amd
// @declaration: true
export namespace a {
    export var x = 10;
}

export namespace c {
    export import b = a.x;
    export var bVal = b;
}
