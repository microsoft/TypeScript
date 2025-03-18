//// [tests/cases/compiler/classWithOverloadImplementationOfWrongName.ts] ////

//// [classWithOverloadImplementationOfWrongName.ts]
class C {
    foo(): string;
    foo(x): number;
    bar(x): any { }
}

//// [classWithOverloadImplementationOfWrongName.js]
class C {
    bar(x) { }
}
