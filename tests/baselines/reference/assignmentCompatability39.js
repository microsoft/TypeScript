//// [assignmentCompatability39.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithTwoPublic = (function () {
        function classWithTwoPublic(one, two) {
            this.one = one;
            this.two = two;
        }
        return classWithTwoPublic;
    })();
    __test2__.classWithTwoPublic = classWithTwoPublic;
    var x2 = new classWithTwoPublic(1, "a");
    ;
    __test2__.__val__x2 = x2;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x2 = __test1__.__val__obj4;
