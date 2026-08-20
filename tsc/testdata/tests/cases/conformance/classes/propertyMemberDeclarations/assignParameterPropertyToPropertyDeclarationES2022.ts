// @useDefineForClassFields: true
// @target: es2022
class C {
    qux = this.bar // should error
    bar = this.foo // should error
    quiz = this.bar // ok
    quench = this.m1() // ok
    quanch = this.m3() // should error
    m1() {
        this.foo // ok
    }
    m3 = function() { }
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

class F {
    Inner = class extends F {
        p2 = this.p1
    }
    p1 = 0
}
class G {
    Inner = class extends G {
        p2 = this.p1
    }
    constructor(public p1: number) {}
}
class H {
    constructor(public p1: C) {}

    public p2 = () => {
        return this.p1.foo;
    }

    public p3 = () => this.p1.foo;
}
