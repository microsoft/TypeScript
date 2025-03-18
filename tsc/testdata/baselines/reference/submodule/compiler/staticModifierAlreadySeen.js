//// [tests/cases/compiler/staticModifierAlreadySeen.ts] ////

//// [staticModifierAlreadySeen.ts]
class C {
    static static foo = 1;
    public static static bar() { }
}

//// [staticModifierAlreadySeen.js]
class C {
    static static;
    foo = 1;
    static static;
    bar() { }
}
