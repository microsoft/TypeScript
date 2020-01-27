// @useDefineForClassFields: true
// @target: esnext
class C {
    qux = this.bar // should error
    bar = this.foo // should error
    quiz = this.bar // ok
    m1() {
        this.foo // ok
    }
    constructor(public foo: string) {}
    quim = this.baz // should error
    baz = this.foo; // should error
    quid = this.baz // ok
    m2() {
        this.foo // ok
    }
}

class D extends C {
    quill = this.foo // ok
}

class E {
    bar = () => this.foo1 + this.foo2; // both ok
    foo1 = '';
    constructor(public foo2: string) {}
}
