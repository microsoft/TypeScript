//// [tests/cases/compiler/nestedLoopWithOnlyInnerLetCaptured.ts] ////

//// [nestedLoopWithOnlyInnerLetCaptured.ts]
declare let doSomething;

for (let a1 of [])
    for (let a2 of a1.someArray)
        doSomething(() => a2);

//// [nestedLoopWithOnlyInnerLetCaptured.js]
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    var a1 = _a[_i];
    var _loop_1 = function (a2) {
        doSomething(function () { return a2; });
    };
    for (var _b = 0, _c = a1.someArray; _b < _c.length; _b++) {
        var a2 = _c[_b];
        _loop_1(a2);
    }
}
