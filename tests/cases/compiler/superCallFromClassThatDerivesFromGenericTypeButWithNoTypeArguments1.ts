
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A {
    constructor() { super(value => String(value)); }
}