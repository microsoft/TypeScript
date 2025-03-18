//// [tests/cases/conformance/types/objectTypeLiteral/callSignatures/constructSignatureWithAccessibilityModifiersOnParameters.ts] ////

//// [constructSignatureWithAccessibilityModifiersOnParameters.ts]
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

//// [constructSignatureWithAccessibilityModifiersOnParameters.js]
class C {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class C2 {
    x;
    constructor(x) {
        this.x = x;
    }
}
class C3 {
    x;
    constructor(x) {
        this.x = x;
    }
}
var a;
var b;
