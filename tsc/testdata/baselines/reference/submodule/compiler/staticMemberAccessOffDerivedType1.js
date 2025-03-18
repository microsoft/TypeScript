//// [tests/cases/compiler/staticMemberAccessOffDerivedType1.ts] ////

//// [staticMemberAccessOffDerivedType1.ts]
class SomeBase {
    static GetNumber() {
        return 2;
    }
}
class P extends SomeBase {
    static SomeNumber = P.GetNumber();
}


//// [staticMemberAccessOffDerivedType1.js]
class SomeBase {
    static GetNumber() {
        return 2;
    }
}
class P extends SomeBase {
    static SomeNumber = P.GetNumber();
}
