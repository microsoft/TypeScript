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
var X = /** @class */ (function () {
    function X() {
    }
    X.method = function () { };
    X.illegalBeforeProperty = X.data;
    X.okBeforeMethod = X.method;
    X.illegal2 = After.data;
    X.illegal3 = After.method;
    X.data = 13;
    return X;
}());
var After = /** @class */ (function () {
    function After() {
    }
    After.method = function () { };
    ;
    After.data = 12;
    return After;
}());
