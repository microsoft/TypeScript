//// [tests/cases/compiler/errorOnInitializerInInterfaceProperty.ts] ////

//// [errorOnInitializerInInterfaceProperty.ts]
interface Foo {
    bar: number = 5;
}


//// [errorOnInitializerInInterfaceProperty.js]
