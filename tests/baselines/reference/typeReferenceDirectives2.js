//// [tests/cases/compiler/typeReferenceDirectives2.ts] ////

//// [index.d.ts]
interface $ { x }

//// [app.ts]
interface A {
    x: $
}

//// [app.js]


//// [app.d.ts]
interface A {
    x: $;
}
