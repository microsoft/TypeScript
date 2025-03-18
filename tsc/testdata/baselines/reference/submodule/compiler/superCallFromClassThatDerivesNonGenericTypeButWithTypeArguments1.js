//// [tests/cases/compiler/superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.ts] ////

//// [superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.ts]
class A {
    constructor(private map: (value: number) => string) {

    }
}

class B extends A<number, string> {
    constructor() { super(value => String(value)); }
}

//// [superCallFromClassThatDerivesNonGenericTypeButWithTypeArguments1.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class B extends A {
    constructor() { super(value => String(value)); }
}
