//// [tests/cases/compiler/accessOverriddenBaseClassMember1.ts] ////

//// [accessOverriddenBaseClassMember1.ts]
class Point {
    constructor(public x: number, public y: number) { }
    public toString() {
        return "x=" + this.x + " y=" + this.y;
    }
}
class ColoredPoint extends Point {
    constructor(x: number, y: number, public color: string) {
        super(x, y);
    }
    public toString() {
        return super.toString() + " color=" + this.color;
    }
}


//// [accessOverriddenBaseClassMember1.js]
class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return "x=" + this.x + " y=" + this.y;
    }
}
class ColoredPoint extends Point {
    color;
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toString() + " color=" + this.color;
    }
}
