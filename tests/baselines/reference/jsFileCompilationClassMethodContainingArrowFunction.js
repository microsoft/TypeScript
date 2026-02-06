//// [tests/cases/compiler/jsFileCompilationClassMethodContainingArrowFunction.ts] ////

//// [a.js]
class c {
    method(a) {
        let x = a => this.method(a);
    }
}


//// [out.js]
"use strict";
class c {
    method(a) {
        let x = a => this.method(a);
    }
}
