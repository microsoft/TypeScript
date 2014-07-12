class C {
    foo: string;
    constructor(x = 1); // error
    constructor() {
    }
}

class D<T> {
    foo: string;
    constructor(x = 1); // error
    constructor() {
    }
}