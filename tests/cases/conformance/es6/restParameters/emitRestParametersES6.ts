// @target: es6
function bar(...rest) { }
function foo(x: number, y: string, ...rest) { }

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

var funcExp = (...rest) => { }
var funcExp1 = (X:number, ...rest) => { }

var obj: {
    func1: (...rest) => void
}

var obj2 = {
    func(...rest) { }
}