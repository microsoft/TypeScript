// @target: es6
class C {
    y: number;
    constructor(x: number) {
    }
}

class D {
    y: number;
    x: string = "hello";
    constructor(x: number, z = "hello") {
        this.y = 10;
    }
}