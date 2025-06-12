//// [tests/cases/compiler/restParamModifier2.ts] ////

//// [restParamModifier2.ts]
class C {
    constructor(public ...rest: string[]) {}
}

//// [restParamModifier2.js]
class C {
    constructor(...rest) {
        this.rest = rest;
    }
}
