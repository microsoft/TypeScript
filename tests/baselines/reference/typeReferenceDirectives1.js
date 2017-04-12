//// [tests/cases/compiler/typeReferenceDirectives1.ts] ////

//// [index.d.ts]
interface $ { x }

//// [app.ts]
/// <reference types="lib"/>
interface A {
    x: $
}

//// [app.js]


//// [app.d.ts]
/// <reference types="lib" />
interface A {
    x: $;
}
