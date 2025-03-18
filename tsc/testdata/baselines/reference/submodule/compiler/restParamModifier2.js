//// [tests/cases/compiler/restParamModifier2.ts] ////

//// [restParamModifier2.ts]
class C {
    constructor(public ...rest: string[]) {}
}

//// [restParamModifier2.js]
class C {
    rest;
    constructor(...rest) {
        this.rest = rest;
    }
}
