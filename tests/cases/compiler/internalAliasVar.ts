// @declaration: true
module a {
    export var x = 10;
}

module c {
    import b = a.x;
    export var bVal = b;
}
