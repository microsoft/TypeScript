//// [tests/cases/conformance/classes/nestedClassDeclaration.ts] ////

//// [nestedClassDeclaration.ts]
// nested classes are not allowed

class C {
    x: string;
    class C2 {
    }
}

function foo() {
    class C3 {
    }
}

var x = {
    class C4 {
    }
}


//// [nestedClassDeclaration.js]
// nested classes are not allowed
class C {
    x;
}
class C2 {
}
function foo() {
    class C3 {
    }
}
var x = {
    class: C4
}, {};
