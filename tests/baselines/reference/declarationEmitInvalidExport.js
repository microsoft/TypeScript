//// [tests/cases/compiler/declarationEmitInvalidExport.ts] ////

//// [declarationEmitInvalidExport.ts]
if (false) {
  export var myClass = 0;
}
export type MyClass = typeof myClass;
}


//// [declarationEmitInvalidExport.js]
if (false) {
    export var myClass = 0;
}
export {};
