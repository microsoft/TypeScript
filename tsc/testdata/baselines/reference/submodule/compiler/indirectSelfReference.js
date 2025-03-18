//// [tests/cases/compiler/indirectSelfReference.ts] ////

//// [indirectSelfReference.ts]
class a extends b{ }
class b extends a{ }

//// [indirectSelfReference.js]
class a extends b {
}
class b extends a {
}
