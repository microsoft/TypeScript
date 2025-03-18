//// [tests/cases/compiler/specializedSignatureOverloadReturnTypeWithIndexers.ts] ////

//// [specializedSignatureOverloadReturnTypeWithIndexers.ts]
interface A {
    f(p: string): { [p: string]: string; };
    f(p: "spec"): { [p: string]: any; } // Should be ok
}
interface B {
    f(p: string): { [p: number]: string; };
    f(p: "spec"): { [p: string]: any; } // Should be ok
}
interface C {
    f(p: string): { [p: number]: string; };
    f(p: "spec"): { [p: number]: any; } // Should be ok
}
interface D {
    f(p: string): { [p: string]: string; };
    f(p: "spec"): { [p: number]: any; } // Should be error
}

//// [specializedSignatureOverloadReturnTypeWithIndexers.js]
