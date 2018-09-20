//// [classExpressionWithStaticProperties3.ts]
declare var console: any;
const arr: {y(): number}[] = [];
for (let i = 0; i < 3; i++) {
    arr.push(class C {
        static x = i;
        static y = () => C.x * 2;
    });
}
arr.forEach(C => console.log(C.y()));

//// [classExpressionWithStaticProperties3.js]
var _a;
var arr = [];
var _loop_1 = function (i) {
    arr.push((_a = /** @class */ (function () {
            function C() {
            }
            return C;
        }()),
        _a.x = i,
        _a.y = function () { return _a.x * 2; },
        _a));
};
for (var i = 0; i < 3; i++) {
    _loop_1(i);
}
arr.forEach(function (C) { return console.log(C.y()); });
