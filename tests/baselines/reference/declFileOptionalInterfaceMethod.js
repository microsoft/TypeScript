//// [tests/cases/compiler/declFileOptionalInterfaceMethod.ts] ////

//// [declFileOptionalInterfaceMethod.ts]
interface X {
    f? <T>();
}


//// [declFileOptionalInterfaceMethod.js]
"use strict";


//// [declFileOptionalInterfaceMethod.d.ts]
interface X {
    f?<T>(): any;
}
