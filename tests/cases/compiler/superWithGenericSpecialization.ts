class C<T> {
    x: T;
}

class D<T> extends C<string> {
    y: T;
    constructor() {
        super(); // uses the type parameter type of the base class, ie string
    }
}

var d: D<number>;
var r: string = d.x;
var r2: number = d.y;