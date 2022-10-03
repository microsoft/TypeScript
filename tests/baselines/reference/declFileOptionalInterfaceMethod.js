//// [declFileOptionalInterfaceMethod.ts]
interface X {
    f? <T>();
}


//// [declFileOptionalInterfaceMethod.js]


//// [declFileOptionalInterfaceMethod.d.ts]
interface X {
    f?<T>(): any;
}
