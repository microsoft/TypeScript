//// [tests/cases/compiler/superCallFromClassThatDerivesFromGenericTypeButWithNoTypeArguments1.ts] ////

//// [superCallFromClassThatDerivesFromGenericTypeButWithNoTypeArguments1.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatDerivesFromGenericTypeButWithNoTypeArguments1.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class B extends A {
    constructor() { super(value => String(value)); }
}
