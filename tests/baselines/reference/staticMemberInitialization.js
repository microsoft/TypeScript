//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticMemberInitialization.ts] ////

//// [staticMemberInitialization.ts]
class C {
    static x = 1;
}

var c = new C();
var r = C.x;

//// [staticMemberInitialization.js]
class C {
    static x = 1;
}
var c = new C();
var r = C.x;
