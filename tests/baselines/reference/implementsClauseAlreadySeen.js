//// [tests/cases/compiler/implementsClauseAlreadySeen.ts] ////

//// [implementsClauseAlreadySeen.ts]
class C {
    
}
class D implements C implements C {
    baz() { }
}

//// [implementsClauseAlreadySeen.js]
class C {
}
class D {
    baz() { }
}
