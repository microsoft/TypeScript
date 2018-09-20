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
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.create = function () {
        return new Shape();
    };
    return Shape;
}());
var x = Shape;
