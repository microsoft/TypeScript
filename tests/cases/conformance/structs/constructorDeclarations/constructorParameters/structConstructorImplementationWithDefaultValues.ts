// doc3.1

struct C {
    constructor(x);
    constructor(x = 1) {
        var y = x;
    }
}

/* struct D<T> {
    constructor(x);
    constructor(x:T = null) {
        var y = x;
    }
}

struct E<T extends Date> {
    constructor(x);
    constructor(x: T = null) {
        var y = x;
    }
} */