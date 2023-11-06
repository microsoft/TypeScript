//// [tests/cases/compiler/typeReferenceDirectives2.ts] ////

//// [/app.ts]
interface A {
    x: $
}
//// [/types/lib/index.d.ts]
interface $ { x }


/// [Declarations] ////



//// [/app.d.ts]
interface A {
    x: $;
}
