//// [emitClassDeclarationWithMethodInES6.ts]
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

//// [emitClassDeclarationWithMethodInES6.js]
class D {
    constructor() {
    }
    foo() {
    }
    ["computedName"]() {
    }
    ["computedName"](a) {
    }
    ["computedName"](a) {
        return 1;
    }
    bar() {
        return "HI";
    }
    baz(a, x) {
        return "HELLO";
    }
}
