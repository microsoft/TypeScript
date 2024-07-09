class D {
    readonly noWiden = 1
    constructor(readonly widen = 2) {
        this.noWiden = 5; // error
        this.widen = 6; // ok
    }
}
new D(7); // ok
