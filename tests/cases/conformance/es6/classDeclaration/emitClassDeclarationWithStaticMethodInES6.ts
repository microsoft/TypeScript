// @target:es6
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