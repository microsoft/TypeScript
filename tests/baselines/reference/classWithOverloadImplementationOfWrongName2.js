//// [tests/cases/compiler/classWithOverloadImplementationOfWrongName2.ts] ////

//// [classWithOverloadImplementationOfWrongName2.ts]
class C {
    foo(): string;
    bar(x): any { }
    foo(x): number;
}

//// [classWithOverloadImplementationOfWrongName2.js]
class C {
    bar(x) { }
}
