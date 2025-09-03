//// [tests/cases/conformance/classes/propertyMemberDeclarations/propertyNamedPrototype.ts] ////

//// [propertyNamedPrototype.ts]
class C {
    prototype: number; // ok
    static prototype: C; // error
}

//// [propertyNamedPrototype.js]
class C {
    prototype; // ok
    static prototype; // error
}
