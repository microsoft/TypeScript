//// [tests/cases/compiler/implementsClauseAlreadySeen.ts] ////

//// [implementsClauseAlreadySeen.ts]
class C {
    
}
class D implements C implements C {
    baz() { }
}

//// [implementsClauseAlreadySeen.js]
"use strict";
class C {
}
class D {
    baz() { }
}
