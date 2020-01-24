// @useDefineForClassFields: true
// @target: esnext
class C {
    bar = this.foo // should error
    m1() {
        this.foo // ok
    }
    constructor(private foo: string) {}
    baz = this.foo; // should error
    m2() {
        this.foo // ok
    }
}
