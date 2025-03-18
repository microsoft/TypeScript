//// [tests/cases/compiler/extendBaseClassBeforeItsDeclared.ts] ////

//// [extendBaseClassBeforeItsDeclared.ts]
class derived extends base { }
 
class base { constructor (public n: number) { } }

//// [extendBaseClassBeforeItsDeclared.js]
class derived extends base {
}
class base {
    n;
    constructor(n) {
        this.n = n;
    }
}
