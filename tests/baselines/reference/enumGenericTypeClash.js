//// [tests/cases/compiler/enumGenericTypeClash.ts] ////

//// [enumGenericTypeClash.ts]
class X<A,B,C> { }
enum X { MyVal }


//// [enumGenericTypeClash.js]
class X {
}
(function (X) {
    X[X["MyVal"] = 0] = "MyVal";
})(X || (X = {}));
