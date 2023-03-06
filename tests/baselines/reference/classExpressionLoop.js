//// [classExpressionLoop.ts]
let arr = [];
for (let i = 0; i < 10; ++i) {
    arr.push(class C {
        prop = i;
    });
}


//// [classExpressionLoop.js]
var arr = [];
var _loop_1 = function (i) {
    arr.push(/** @class */ (function () {
        function C() {
            this.prop = i;
        }
        return C;
    }()));
};
for (var i = 0; i < 10; ++i) {
    _loop_1(i);
}
