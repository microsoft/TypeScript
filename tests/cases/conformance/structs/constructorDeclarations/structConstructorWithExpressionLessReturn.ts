// doc 3
// just return keyword is ok.
// no error

struct C {
    constructor() {
        return;
    }
}

struct D {
    x: number;
    constructor() {
        return;
    }
}

struct E {
    constructor(public x: number) {
        return;
    }
}

struct F<T> {
    constructor(public x: T) {
        return;
    }
}