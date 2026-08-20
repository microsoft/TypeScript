//// [tests/cases/conformance/classes/propertyMemberDeclarations/abstractPropertyInitializer.ts] ////

//// [abstractPropertyInitializer.ts]
abstract class C {
    abstract prop = 1
}


//// [abstractPropertyInitializer.js]
"use strict";
class C {
}


//// [abstractPropertyInitializer.d.ts]
declare abstract class C {
    abstract prop: number;
}
