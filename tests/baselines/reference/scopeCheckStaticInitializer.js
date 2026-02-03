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
let X = (() => {
    class X {
        static method() { }
    }
    X.illegalBeforeProperty = X.data;
    X.okBeforeMethod = X.method;
    X.illegal2 = After.data;
    X.illegal3 = After.method;
    X.data = 13;
    return X;
})();
let After = (() => {
    class After {
        static method() { }
        ;
    }
    After.data = 12;
    return After;
})();
