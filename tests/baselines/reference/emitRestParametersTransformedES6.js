//// [emitRestParametersTransformedES6.ts]
function foo1(x: number, ...rest: number[]) {
    return [x].concat(rest);
}

class C {
    constructor(x: number, ...rest: number[]) {
        this.foo2(x);
        this.foo2(x, ...rest);
    }
    private foo2(x: number, ...rest: number[]) {
        return rest;
    }
}

class D extends C {
    constructor(...rest: number[]) {
        super(0, ...rest);
    }
}


//// [emitRestParametersTransformedES6.js]
function foo1(x, ...rest) {
    return [x].concat(rest);
}
class C {
    constructor(x, ...rest) {
        this.foo2(x);
        this.foo2(x, ...rest);
    }
    foo2(x, ...rest) {
        return rest;
    }
}
class D extends C {
    constructor(...rest) {
        super(0, ...rest);
    }
}
