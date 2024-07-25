//// [tests/cases/conformance/classes/propertyMemberDeclarations/constructorParameterShadowsOuterScopes2.ts] ////

//// [constructorParameterShadowsOuterScopes2.ts]
// With useDefineForClassFields: true and ESNext target, initializer
// expressions for property declarations are evaluated in the scope of
// the class body and are permitted to reference parameters or local
// variables of the constructor. This is different from classic
// Typescript behaviour, with useDefineForClassFields: false. There,
// initialisers of property declarations are evaluated in the scope of
// the constructor body.

// Note that when class fields are accepted in the ECMAScript
// standard, the target will become that year's ES20xx

var x = 1;
class C {
    b = x; // ok
    constructor(x: string) {
    }
}

var y = 1;
class D {
    b = y; // ok
    constructor(x: string) {
        var y = "";
    }
}

class E {
    b = z; // not ok
    constructor(z: string) {
    }
}


//// [constructorParameterShadowsOuterScopes2.js]
// With useDefineForClassFields: true and ESNext target, initializer
// expressions for property declarations are evaluated in the scope of
// the class body and are permitted to reference parameters or local
// variables of the constructor. This is different from classic
// Typescript behaviour, with useDefineForClassFields: false. There,
// initialisers of property declarations are evaluated in the scope of
// the constructor body.
// Note that when class fields are accepted in the ECMAScript
// standard, the target will become that year's ES20xx
var x = 1;
class C {
    b = x; // ok
    constructor(x) {
    }
}
var y = 1;
class D {
    b = y; // ok
    constructor(x) {
        var y = "";
    }
}
class E {
    b = z; // not ok
    constructor(z) {
    }
}
