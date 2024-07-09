//@module: amd
// @declaration: true
export module a {
    export var x = 10;
}

export import b = a.x;
export var bVal = b;

