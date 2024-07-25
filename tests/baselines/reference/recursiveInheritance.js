//// [tests/cases/compiler/recursiveInheritance.ts] ////

//// [recursiveInheritance.ts]
interface I5 extends I5 { // error
    foo():void;
} 

interface i8 extends i9 { } // error
interface i9 extends i8 { } // error


//// [recursiveInheritance.js]
