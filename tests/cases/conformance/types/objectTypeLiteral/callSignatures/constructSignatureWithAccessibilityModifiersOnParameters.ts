// Parameter properties are only valid in constructor definitions, not even in other forms of construct signatures

class C {
    constructor(public x, private y) { }
}

class C2 {
    constructor(public x) { }
}

class C3 {
    constructor(private x) { }
}

interface I {
    new (public x);
}

interface I2 {
    new (private x);
}

var a: {
    new (public x);
}

var b: {
    new (private x);
}