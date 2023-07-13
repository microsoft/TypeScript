//// [tests/cases/compiler/reservedNameOnInterfaceImport.ts] ////

//// [reservedNameOnInterfaceImport.ts]
declare module test {
    interface istring { }

    // Should error; 'test.istring' is a type, so this import conflicts with the 'string' type.
    import string = test.istring;
}


//// [reservedNameOnInterfaceImport.js]
