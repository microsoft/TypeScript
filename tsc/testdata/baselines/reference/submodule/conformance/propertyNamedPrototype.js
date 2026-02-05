//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyNamedPrototype.ts] ////

//// [propertyNamedPrototype.ts]
class C {
    prototype: number; // ok
    static prototype: C; // error
}

//// [propertyNamedPrototype.js]
"use strict";
class C {
    prototype; // ok
    static prototype; // error
}
