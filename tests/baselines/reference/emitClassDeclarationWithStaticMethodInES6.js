//// [emitClassDeclarationWithStaticMethodInES6.ts]
class E {
    normalMethod() { }
    static ["computedname"]() { }
    static ["computedname"](a:string) { }
    static ["computedname"](a: string): boolean { return true; }
    static staticMethod() {
        var x = 1 + 2;
        return x
    }
    static foo(a: string) { }
    static bar(a: string): number { return 1; }
}

//// [emitClassDeclarationWithStaticMethodInES6.js]
class E {
    constructor() {
    }
    normalMethod() {
    }
    static ["computedname"]() {
    }
    static ["computedname"](a) {
    }
    static ["computedname"](a) {
        return true;
    }
    static staticMethod() {
        var x = 1 + 2;
        return x;
    }
    static foo(a) {
    }
    static bar(a) {
        return 1;
    }
}
