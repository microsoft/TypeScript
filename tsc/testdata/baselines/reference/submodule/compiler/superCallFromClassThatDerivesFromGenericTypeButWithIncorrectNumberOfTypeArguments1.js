//// [tests/cases/compiler/superCallFromClassThatDerivesFromGenericTypeButWithIncorrectNumberOfTypeArguments1.ts] ////

//// [superCallFromClassThatDerivesFromGenericTypeButWithIncorrectNumberOfTypeArguments1.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A<number> {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatDerivesFromGenericTypeButWithIncorrectNumberOfTypeArguments1.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class B extends A {
    constructor() { super(value => String(value)); }
}
