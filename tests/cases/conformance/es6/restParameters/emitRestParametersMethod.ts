// @target: es5
class C {
    constructor(name: string, ...rest) { rest; }

    public bar(...rest) { rest; }
    public foo(x: number, ...rest) { rest; }
}

class D {
    constructor(...rest) { rest; }

    public bar(...rest) { rest; }
    public foo(x: number, ...rest) { rest; }
}