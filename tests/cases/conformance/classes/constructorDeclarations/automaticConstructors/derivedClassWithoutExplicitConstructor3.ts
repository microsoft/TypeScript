// automatic constructors with a class hieararchy of depth > 2

class Base {
    a = 1;
    constructor(x: number) { this.a = x; }
}

class Derived extends Base {
    b = '';
    constructor(y: string, z: string) {
        super(2);
        this.b = y;
    }
}

class Derived2 extends Derived {
    x = 1
    y = 'hello';
}

var r = new Derived(); // error
var r2 = new Derived2(1); // error
var r3 = new Derived('', '');

class Base2<T> {
    a: T;
    constructor(x: T) { this.a = x; }
}

class D<T> extends Base {
    b: T = null;
    constructor(y: T, z: T) {
        super(2);
        this.b = y;
    }
}


class D2<T extends Date> extends D<T> {
    x = 2
    y: T = null;
}

var d = new D2(); // error
var d2 = new D2(new Date()); // error
var d3 = new D2(new Date(), new Date()); // ok