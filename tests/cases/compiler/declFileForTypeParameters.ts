// @declaration: true

class C<T> {
    x: T;
    foo(a: T): T {
        return this.x;
    }
}