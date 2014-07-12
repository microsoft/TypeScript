// Parameter properties are not valid in overloads of constructors

class C {
    constructor(public x, private y);
    constructor(public x, private y) { }
}

class C2 {
    constructor(private x);
    constructor(public x) { }
}

class C3 {
    constructor(private x);
    constructor(private y) { }
}

interface I {
    new (public x);
    new (public x);
}

interface I2 {
    new (private x);
    new (private x);
}

var a: {
    new (public x);
    new (public y);
}

var b: {
    new (private x);
    new (private y);
}