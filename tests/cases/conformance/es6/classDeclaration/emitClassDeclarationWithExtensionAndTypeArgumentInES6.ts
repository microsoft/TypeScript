// @target: es6
class B<T> {
    constructor(a: T) { }
}
class C extends B<string> { }
class D extends B<number> {
    constructor(a: any)
    constructor(b: number) {
        super(b);
    }
}