//// [tests/cases/conformance/types/thisType/thisTypeErrors2.ts] ////

//// [thisTypeErrors2.ts]
class Base {
    constructor(a: this) {
    }
}
class Generic<T> {
}
class Derived {
    n: number;
    constructor(public host: Generic<this>) {
        let self: this = this;
        this.n = 12;
    }
}


//// [thisTypeErrors2.js]
class Base {
    constructor(a) {
    }
}
class Generic {
}
class Derived {
    host;
    n;
    constructor(host) {
        this.host = host;
        let self = this;
        this.n = 12;
    }
}
