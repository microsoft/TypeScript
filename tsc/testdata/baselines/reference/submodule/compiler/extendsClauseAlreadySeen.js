//// [tests/cases/compiler/extendsClauseAlreadySeen.ts] ////

//// [extendsClauseAlreadySeen.ts]
class C {

}
class D extends C extends C {
    baz() { }
}

//// [extendsClauseAlreadySeen.js]
"use strict";
class C {
}
class D extends C extends C {
    baz() { }
}
