class C {
    constructor(x);
    constructor(public x: string = 1) { // error
        var y = x;
    }
}

class D<T, U> {
    constructor(x: T, y: U);
    constructor(x: T = 1, public y: U = x) { // error
        var z = x;
    }
}

class E<T extends Date> {
    constructor(x);
    constructor(x: T = new Date()) { // error
        var y = x;
    }
}