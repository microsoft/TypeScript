//// [tests/cases/conformance/es6/defaultParameters/emitDefaultParametersMethodES6.ts] ////

//// [emitDefaultParametersMethodES6.ts]
class C {
    constructor(t: boolean, z: string, x: number, y = "hello") { }

    public foo(x: string, t = false) { }
    public foo1(x: string, t = false, ...rest) { }
    public bar(t = false) { }
    public boo(t = false, ...rest) { }
}

class D {
    constructor(y = "hello") { }
}

class E {
    constructor(y = "hello", ...rest) { }
}

//// [emitDefaultParametersMethodES6.js]
class C {
    constructor(t, z, x, y = "hello") { }
    foo(x, t = false) { }
    foo1(x, t = false, ...rest) { }
    bar(t = false) { }
    boo(t = false, ...rest) { }
}
class D {
    constructor(y = "hello") { }
}
class E {
    constructor(y = "hello", ...rest) { }
}
