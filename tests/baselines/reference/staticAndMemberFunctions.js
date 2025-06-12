//// [tests/cases/compiler/staticAndMemberFunctions.ts] ////

//// [staticAndMemberFunctions.ts]
class T {
    static x() { }
    public y() { }
}

//// [staticAndMemberFunctions.js]
class T {
    static x() { }
    y() { }
}
