//// [tests/cases/compiler/indirectSelfReferenceGeneric.ts] ////

//// [indirectSelfReferenceGeneric.ts]
class a<T> extends b<T> { }
class b<T> extends a<T> { }

//// [indirectSelfReferenceGeneric.js]
class a extends b {
}
class b extends a {
}
