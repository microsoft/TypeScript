//// [emitClassDeclarationWithMethodInES6.ts]
class D {
    _bar: string;
    foo() { }
    ["computedName1"]() { }
    ["computedName2"](a: string) { }
    ["computedName3"](a: string): number { return 1; }
    bar(): string {
        return this._bar;
    } 
    baz(a: any, x: string): string {
        return "HELLO";
    }
    static ["computedname4"]() { }
    static ["computedname5"](a: string) { }
    static ["computedname6"](a: string): boolean { return true; }
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
    ["computedName1"]() { }
    ["computedName2"](a) { }
    ["computedName3"](a) { return 1; }
    bar() {
        return this._bar;
    }
    baz(a, x) {
        return "HELLO";
    }
    static ["computedname4"]() { }
    static ["computedname5"](a) { }
    static ["computedname6"](a) { return true; }
    static staticMethod() {
        var x = 1 + 2;
        return x;
    }
    static foo(a) { }
    static bar(a) { return 1; }
}
