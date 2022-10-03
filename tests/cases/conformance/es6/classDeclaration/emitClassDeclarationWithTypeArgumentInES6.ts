// @target: es6
class B<T> {
    x: T;
    B: T;
    constructor(a: T) { this.B = a;}
    foo(): T {
        return this.x;
    }
    get BB(): T {
        return this.B;
    }
    set BBWith(c: T) {
        this.B = c;
    }
}