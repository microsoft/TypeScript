//// [assignmentCompatability43.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    ;
    var obj2 = { one: 1, two: "a" };
    ;
    __test2__.__val__obj2 = obj2;
})(__test2__ || (__test2__ = {}));
__test2__.__val__obj2 = __test1__.__val__obj4;
