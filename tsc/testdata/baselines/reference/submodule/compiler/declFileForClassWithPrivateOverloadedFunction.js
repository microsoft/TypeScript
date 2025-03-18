//// [tests/cases/compiler/declFileForClassWithPrivateOverloadedFunction.ts] ////

//// [declFileForClassWithPrivateOverloadedFunction.ts]
class C {
    private foo(x: number);
    private foo(x: string);
    private foo(x: any) { }
}

//// [declFileForClassWithPrivateOverloadedFunction.js]
class C {
    foo(x) { }
}
