//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessorsOverrideMethod.ts] ////

//// [accessorsOverrideMethod.ts]
class A {
    m() { }
}
class B extends A {
    get m() { return () => 1 }
}


//// [accessorsOverrideMethod.js]
"use strict";
class A {
    m() { }
}
class B extends A {
    get m() { return () => 1; }
}
