//// [tests/cases/compiler/extendsClauseAlreadySeen2.ts] ////

//// [extendsClauseAlreadySeen2.ts]
class C<T> {

}
class D<T> extends C<number> extends C<string> {
    baz() { }
}

//// [extendsClauseAlreadySeen2.js]
class C {
}
class D extends C extends C {
    baz() { }
}
