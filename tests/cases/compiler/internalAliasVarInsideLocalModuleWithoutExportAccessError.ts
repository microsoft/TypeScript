//@module: commonjs
export namespace a {
    export var x = 10;
}

export namespace c {
    import b = a.x;
    export var bVal = b;
}

export var z = c.b;