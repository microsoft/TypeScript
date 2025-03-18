//// [tests/cases/compiler/scopeCheckStaticInitializer.ts] ////

//// [scopeCheckStaticInitializer.ts]
class X {
    static illegalBeforeProperty = X.data;
    static okBeforeMethod = X.method;

    static illegal2 = After.data;
    static illegal3 = After.method;
    static data = 13;
    static method() { }
}
class After {
    static data = 12;
    static method() { };
}



//// [scopeCheckStaticInitializer.js]
class X {
    static illegalBeforeProperty = X.data;
    static okBeforeMethod = X.method;
    static illegal2 = After.data;
    static illegal3 = After.method;
    static data = 13;
    static method() { }
}
class After {
    static data = 12;
    static method() { }
    ;
}
