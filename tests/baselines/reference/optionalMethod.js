//// [tests/cases/conformance/classes/propertyMemberDeclarations/optionalMethod.ts] ////

//// [optionalMethod.ts]
class Base {
    method?() { }
}


//// [optionalMethod.js]
class Base {
    method() { }
}
