//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendsShadowedConstructorFunction.ts] ////

//// [classExtendsShadowedConstructorFunction.ts]
class C { foo: string; }

module M {
    var C = 1;
    class D extends C { // error, C must evaluate to constructor function
        bar: string;
    }
}

//// [classExtendsShadowedConstructorFunction.js]
class C {
}
var M;
(function (M) {
    var C = 1;
    class D extends C {
    }
})(M || (M = {}));
