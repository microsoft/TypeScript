class B extends A { // error
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

class B4<T> extends A1<T> { // Error
    constructor(msg: T) {
        super(msg);
    }
}

class B5 extends A1<number> { // Error
    constructor(msg: number) {
        super(msg);
    }
}

class B6 extends B4<A1<number>> { // No error
    constructor(msg: A1<number>) {
        super(msg);
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