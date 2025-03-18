//// [tests/cases/conformance/classes/members/privateNames/privateNameES5Ban.ts] ////

//// [privateNameES5Ban.ts]
class A {
    constructor() {}
    #field = 123;
    #method() {}
    static #sField = "hello world";
    static #sMethod() {}
    get #acc() { return ""; }
    set #acc(x: string) {}
    static get #sAcc() { return 0; }
    static set #sAcc(x: number) {}
}



//// [privateNameES5Ban.js]
class A {
    constructor() { }
    #field = 123;
    #method() { }
    static #sField = "hello world";
    static #sMethod() { }
    get #acc() { return ""; }
    set #acc(x) { }
    static get #sAcc() { return 0; }
    static set #sAcc(x) { }
}
