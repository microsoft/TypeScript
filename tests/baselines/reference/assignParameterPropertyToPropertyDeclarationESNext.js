//// [assignParameterPropertyToPropertyDeclarationESNext.ts]
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


//// [assignParameterPropertyToPropertyDeclarationESNext.js]
class C {
    foo;
    bar = this.foo; // should error
    m1() {
        this.foo; // ok
    }
    constructor(foo) {
        this.foo = foo;
    }
    baz = this.foo; // should error
    m2() {
        this.foo; // ok
    }
}
