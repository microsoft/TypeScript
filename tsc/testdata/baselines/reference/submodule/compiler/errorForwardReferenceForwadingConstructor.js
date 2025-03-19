//// [tests/cases/compiler/errorForwardReferenceForwadingConstructor.ts] ////

//// [errorForwardReferenceForwadingConstructor.ts]
// Error forward referencing derived class with forwarding constructor

function f() {
    var d1 = new derived();
    var d2 = new derived(4);
}

class base { constructor(public n: number) { } }
class derived extends base { }


//// [errorForwardReferenceForwadingConstructor.js]
// Error forward referencing derived class with forwarding constructor
function f() {
    var d1 = new derived();
    var d2 = new derived(4);
}
class base {
    n;
    constructor(n) {
        this.n = n;
    }
}
class derived extends base {
}
