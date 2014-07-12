//// [assignmentCompatability40.js]
var __test1__;
(function (__test1__) {
    ;
    var obj4 = { one: 1 };
    ;
    __test1__.__val__obj4 = obj4;
})(__test1__ || (__test1__ = {}));
var __test2__;
(function (__test2__) {
    var classWithPrivate = (function () {
        function classWithPrivate(one) {
            this.one = one;
        }
        return classWithPrivate;
    })();
    __test2__.classWithPrivate = classWithPrivate;
    var x5 = new classWithPrivate(1);
    ;
    __test2__.__val__x5 = x5;
})(__test2__ || (__test2__ = {}));
__test2__.__val__x5 = __test1__.__val__obj4;
