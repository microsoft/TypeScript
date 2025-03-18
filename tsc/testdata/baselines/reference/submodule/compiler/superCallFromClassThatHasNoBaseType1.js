//// [tests/cases/compiler/superCallFromClassThatHasNoBaseType1.ts] ////

//// [superCallFromClassThatHasNoBaseType1.ts]
class A {
    constructor(private map: (value: number) => string) {

    }
}

class B {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatHasNoBaseType1.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class B {
    constructor() { super(value => String(value)); }
}
