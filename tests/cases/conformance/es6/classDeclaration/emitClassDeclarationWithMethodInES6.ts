// @target:es6
class D {
    foo() { }
    ["computedName"]() { }
    ["computedName"](a: string) { }
    ["computedName"](a: string): number { return 1; }
    bar(): string {
        return "HI";
    } 
    baz(a: any, x: string): string {
        return "HELLO";
    }
}