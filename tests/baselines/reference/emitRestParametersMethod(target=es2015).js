//// [tests/cases/conformance/es6/restParameters/emitRestParametersMethod.ts] ////

//// [emitRestParametersMethod.ts]
class C {
    constructor(name: string, ...rest) { }

    public bar(...rest) { }
    public foo(x: number, ...rest) { }
}

class D {
    constructor(...rest) { }

    public bar(...rest) { }
    public foo(x: number, ...rest) { }
}

//// [emitRestParametersMethod.js]
class C {
    constructor(name, ...rest) { }
    bar(...rest) { }
    foo(x, ...rest) { }
}
class D {
    constructor(...rest) { }
    bar(...rest) { }
    foo(x, ...rest) { }
}
