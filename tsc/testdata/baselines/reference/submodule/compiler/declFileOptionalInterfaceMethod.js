//// [tests/cases/compiler/declFileOptionalInterfaceMethod.ts] ////

//// [declFileOptionalInterfaceMethod.ts]
interface X {
    f? <T>();
}


//// [declFileOptionalInterfaceMethod.js]
