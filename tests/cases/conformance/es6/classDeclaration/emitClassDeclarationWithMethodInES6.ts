// @target:es6
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