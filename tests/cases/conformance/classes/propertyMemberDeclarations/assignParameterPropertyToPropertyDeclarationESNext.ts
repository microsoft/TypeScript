// @useDefineForClassFields: true
// @target: esnext
class C {
    qux = this.bar // should error
    bar = this.foo // should error
    quiz = this.bar // ok
    m1() {
        this.foo // ok
    }
    constructor(private foo: string) {}
    quim = this.baz // should error
    baz = this.foo; // should error
    quid = this.baz // ok
    m2() {
        this.foo // ok
    }
}
