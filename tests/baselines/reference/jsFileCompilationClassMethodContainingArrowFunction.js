//// [tests/cases/compiler/jsFileCompilationClassMethodContainingArrowFunction.ts] ////

//// [a.js]
class c {
    method(a) {
        let x = a => this.method(a);
    }
}


//// [out.js]
class c {
    method(a) {
        let x = a => this.method(a);
    }
}
