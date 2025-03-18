//// [tests/cases/compiler/staticInterfaceAssignmentCompat.ts] ////

//// [staticInterfaceAssignmentCompat.ts]
class Shape {
    static create(): Shape {
        return new Shape();
    }
}

interface ShapeFactory {
    create(): Shape;
}

var x: ShapeFactory = Shape;


//// [staticInterfaceAssignmentCompat.js]
class Shape {
    static create() {
        return new Shape();
    }
}
var x = Shape;
