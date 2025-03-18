//// [tests/cases/compiler/extendsClauseAlreadySeen.ts] ////

//// [extendsClauseAlreadySeen.ts]
class C {

}
class D extends C extends C {
    baz() { }
}

//// [extendsClauseAlreadySeen.js]
class C {
}
class D extends C extends C {
    baz() { }
}
