//// [tests/cases/conformance/classes/classDeclarations/declaredClassMergedwithSelf.ts] ////

//// [file1.ts]
declare class C1 {}

declare class C1 {}

declare class C2 {}

interface C2 {}

declare class C2 {}

//// [file2.ts]
declare class C3 { }

//// [file3.ts]
declare class C3 { }

//// [file1.js]
//// [file2.js]
//// [file3.js]
