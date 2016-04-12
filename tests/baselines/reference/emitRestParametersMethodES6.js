//// [emitRestParametersMethodES6.ts]
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


//// [emitRestParametersMethodES6.js]
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
