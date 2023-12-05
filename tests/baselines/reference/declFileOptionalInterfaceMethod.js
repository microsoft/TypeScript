//// [tests/cases/compiler/declFileOptionalInterfaceMethod.ts] ////

//// [declFileOptionalInterfaceMethod.ts]
interface X {
    f? <T>();
}


//// [declFileOptionalInterfaceMethod.js]


//// [declFileOptionalInterfaceMethod.d.ts]
interface X {
    f?<T>(): any;
}
