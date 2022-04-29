class Shape {
    static create(): Shape {
        return new Shape();
    }
}

interface ShapeFactory {
    create(): Shape;
}

var x: ShapeFactory = Shape;
