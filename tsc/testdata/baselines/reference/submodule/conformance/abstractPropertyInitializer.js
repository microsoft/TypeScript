//// [tests/cases/conformance/classes/propertyMemberDeclarations/abstractPropertyInitializer.ts] ////

//// [abstractPropertyInitializer.ts]
abstract class C {
    abstract prop = 1
}


//// [abstractPropertyInitializer.js]
class C {
    prop = 1;
}


//// [abstractPropertyInitializer.d.ts]
declare abstract class C {
    abstract prop: number;
}
