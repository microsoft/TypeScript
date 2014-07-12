class C {
    constructor() { }
    constructor(x) { } // error
}

class D<T> {
    constructor(x: T) { }
    constructor(x: T, y: T) { } // error
}