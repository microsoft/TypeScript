function foo() {
    class B extends A { // no error
        constructor(msg: string) {
            super(msg);
        }
    }

    class B2 extends class B3 extends class C { // no error
    }{
    }{ }

    class B3 extends class { // no error
    }{
    }

    class B4<T> extends A1<T> { // no error
        constructor(msg: T) {
            super(msg);
        }
    }
    
    class B5 extends A1<number> { // no error
        constructor(msg: number) {
            super(msg);
        }
    }

    class B6 extends B4<A1<number>> { // No error
        constructor(msg: A1<number>) {
            super(msg);
        }
    }

    class B7 extends M.c { // no error
    }
}

class A {
    constructor(public msg: string) {

    }
}

class A1<T> {
    constructor(msg: T) {
    }
}

module M {
    export class c {
    }
}