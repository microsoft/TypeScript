//// [tests/cases/compiler/typeReferenceDirectives1.ts] ////

//// [index.d.ts]
interface $ { x }

//// [app.ts]
/// <reference types="lib" preserve="true" />
interface A {
    x: $
}

//// [app.js]
/// <reference types="lib" preserve="true" />


//// [app.d.ts]
/// <reference types="lib" preserve="true" />
interface A {
    x: $;
}
