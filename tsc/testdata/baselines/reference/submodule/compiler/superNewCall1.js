//// [tests/cases/compiler/superNewCall1.ts] ////

//// [superNewCall1.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A<number, string> {
    constructor() {
        new super(value => String(value));
    }
}

//// [superNewCall1.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class B extends A {
    constructor() {
        new super(value => String(value));
    }
}
