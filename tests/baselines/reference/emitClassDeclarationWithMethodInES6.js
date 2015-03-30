//// [emitClassDeclarationWithMethodInES6.ts]
class D {
    _bar: string;
    foo() { }
    ["computedName"]() { }
    ["computedName"](a: string) { }
    ["computedName"](a: string): number { return 1; }
    bar(): string {
        return this._bar;
    } 
    baz(a: any, x: string): string {
        return "HELLO";
    }
    static ["computedname"]() { }
    static ["computedname"](a: string) { }
    static ["computedname"](a: string): boolean { return true; }
    static staticMethod() {
        var x = 1 + 2;
        return x
    }
    static foo(a: string) { }
    static bar(a: string): number { return 1; }
}

//// [emitClassDeclarationWithMethodInES6.js]
class D {
    foo() { }
    ["computedName"]() { }
    ["computedName"](a) { }
    ["computedName"](a) { return 1; }
    bar() {
        return this._bar;
    }
    baz(a, x) {
        return "HELLO";
    }
    static ["computedname"]() { }
    static ["computedname"](a) { }
    static ["computedname"](a) { return true; }
    static staticMethod() {
        var x = 1 + 2;
        return x;
    }
    static foo(a) { }
    static bar(a) { return 1; }
}
