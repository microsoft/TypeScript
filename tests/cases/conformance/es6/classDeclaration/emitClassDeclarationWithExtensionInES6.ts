// @target: es6
class B {
    baz(a: string, y = 10) { }
}
class C extends B {
    foo() { }
    baz(a: string, y:number) {
        super.baz(a, y);
    }
}
class D extends C {
    constructor() {
        super();
    }

    foo() {
        super.foo();
    }

    baz() {
        super.baz("hello", 10);
    }
}
