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
