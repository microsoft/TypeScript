//// [tests/cases/conformance/classes/classDeclarations/classAndVariableWithSameName.ts] ////

//// [classAndVariableWithSameName.ts]
class C { foo: string; } // error
var C = ''; // error

module M {
    class D { // error
        bar: string;
    }

    var D = 1; // error
}

//// [classAndVariableWithSameName.js]
class C {
    foo;
} // error
var C = ''; // error
var M;
(function (M) {
    class D {
        bar;
    }
    var D = 1; // error
})(M || (M = {}));
