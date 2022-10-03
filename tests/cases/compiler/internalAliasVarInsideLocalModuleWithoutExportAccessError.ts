//@module: commonjs
export module a {
    export var x = 10;
}

export module c {
    import b = a.x;
    export var bVal = b;
}

export var z = c.b;