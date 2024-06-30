//// [tests/cases/compiler/moduleResolutionWithSymlinks_referenceTypes.ts] ////

//// [index.d.ts]
declare class MyClass { private x: number; }

//// [index.d.ts]
/// <reference types="library-a" />

//// [app.ts]
/// <reference types="library-a" />
/// <reference types="library-b" />


//// [/app.js]
/// <reference types="library-a" />
/// <reference types="library-b" />
