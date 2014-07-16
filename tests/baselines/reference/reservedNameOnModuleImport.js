//// [reservedNameOnModuleImport.ts]
declare module test {
    module mstring { }

    // Should be fine; this does not clobber any declared values.
    export import string = mstring;
}


//// [reservedNameOnModuleImport.js]
