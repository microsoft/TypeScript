//// [tests/cases/conformance/classes/propertyMemberDeclarations/thisInInstanceMemberInitializer.ts] ////

//// [thisInInstanceMemberInitializer.ts]
class C {
    x = this;
}

class D<T> {
    x = this;
    y: T;
}

//// [thisInInstanceMemberInitializer.js]
class C {
    x = this;
}
class D {
    x = this;
    y;
}
